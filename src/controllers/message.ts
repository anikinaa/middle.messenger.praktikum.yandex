import { selectActiveIdChat } from '../modules/Store/selectors/chats'
import { callbackType, Store } from '../modules'
import { MessageSocket } from '../api/messageSocket'
import { ChatsApi } from '../api/chats'
import { IMessage } from '../models/message'
import { ChatUsersController } from './chatUsers'

const chatsApi = new ChatsApi()

export class MessageController extends ChatUsersController {
    socket: MessageSocket | undefined

    constructor() {
        super()
    }

    async active() {
        const id = selectActiveIdChat(Store.getState()) as number
        const { status, response } = await chatsApi.token(id)
        await this.fetchUsers()
        if (status === 200) {
            const { token } = JSON.parse(response)
            Store.setState({ token })
            this.socket = new MessageSocket()
            await this.socket.init()
            this.socket.getOld()

            this.addListener(MessageSocket.EVENTS.message, this.newMessage.bind(this))
            this.addListener(MessageSocket.EVENTS.getOld, this.oldMessages.bind(this))
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }

    loadMore() {
        this.socket!.getOld()
    }

    sendMessage(msg: string) {
        this.socket?.sendMessage(msg)
    }

    addListener(key: string, callback: callbackType) {
        this.socket?.addEvents(key, callback)
    }

    removeListener(key: string, callback: callbackType) {
        this.socket?.removeEvents(key, callback)
    }

    newMessage(newMessage: IMessage) {
        Store.setState(({ messages: { data, allLoad } }) => ({
            messages: {
                data: [newMessage, ...data],
                allLoad,
            },
        }))
    }

    oldMessages(oldMessages: IMessage[]) {
        Store.setState(({ messages: { data } }) => ({
            messages: {
                data: [...data, ...oldMessages],
                allLoad: oldMessages.length < 20,
            },
        }))
    }

    closeSocket() {
        this.removeListener(MessageSocket.EVENTS.message, this.newMessage.bind(this))
        this.removeListener(MessageSocket.EVENTS.getOld, this.oldMessages.bind(this))
        this.socket?.close()
    }
}
