import { selectActiveIdChat, selectTokenChat } from '../modules/Store/selectors/chats'
import { callbackType, EventBus, Store } from '../modules'
import { selectUserId } from '../modules/Store/selectors/user'
import { selectLastMessage } from '../modules/Store/selectors/messages'

enum EVENTS {
    pong= 'pong',
    ping= 'ping',
    getOld = 'get old',
    message = 'message',
    file = 'file',
    sticker = 'sticker'
}

export class MessageSocket {
    base: string = 'wss://ya-praktikum.tech/ws/chats'

    socket: WebSocket | null | undefined

    timeout: ReturnType<typeof setTimeout> | null = null

    pool: number = 3000

    eventBus: EventBus

    static EVENTS = EVENTS

    constructor() {
        this.eventBus = new EventBus()
        this.eventBus.on(MessageSocket.EVENTS.pong, this._ping.bind(this))
    }

    addEvents(key: string, callback: callbackType) {
        this.eventBus.on(key, callback)
    }

    removeEvents(key: string, callback: callbackType) {
        this.eventBus.off(key, callback)
    }

    async init() {
        return new Promise((resolve, reject) => {
            try {
                const idChat = selectActiveIdChat(Store.getState())
                const idUser = selectUserId(Store.getState())
                const token = selectTokenChat(Store.getState())
                this.socket = new WebSocket(`${this.base}/${idUser}/${idChat}/${token}`)
                this.socket.addEventListener('open', () => {
                    this._ping()
                    resolve(this.socket)
                })
                this._listener()
            } catch (e) {
                reject(e)
            }
        })
    }

    sendMessage(message: string) {
        this._send({
            content: message,
            type: MessageSocket.EVENTS.message,
        })
    }

    private _listener() {
        this.socket!.addEventListener('message', (event) => {
            const data = JSON.parse(event.data)
            const { type } = data
            if (Object.values(MessageSocket.EVENTS).includes(type)) {
                this.eventBus.emitIsExist(type, data)
            } else if (Array.isArray(data)) {
                this.eventBus.emitIsExist(MessageSocket.EVENTS.getOld, data)
            }
        })
    }

    private _send(data: any) {
        this.socket?.send(JSON.stringify(data))
    }

    private _ping() {
        if (this.socket) {
            this.timeout = setTimeout(() => {
                this._send({
                    type: MessageSocket.EVENTS.ping,
                })
            }, this.pool)
        }
    }

    getOld() {
        const offset = selectLastMessage(Store.getState())
        this._send({
            content: offset.toString(),
            type: MessageSocket.EVENTS.getOld,
        })
    }

    close() {
        clearTimeout(this.timeout!)
        this.socket?.close()
        this.socket = null
    }
}
