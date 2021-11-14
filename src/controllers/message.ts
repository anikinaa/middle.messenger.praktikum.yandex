import {selectActiveIdChat} from "../modules/Store/selectors/chats";
import {Store} from "../modules";
import {MessageSocket} from "../api/messageSocket";
import {ChatsApi} from "../api/chats";
import {IMessage} from "../models/message";
import {ChatUsersController} from "./chatUsers";

const chatsApi = new ChatsApi()

export class MessageController extends ChatUsersController{
    socket: MessageSocket | undefined

    constructor() {
        super();
    }

    async active() {
        const id = selectActiveIdChat(Store.getState()) as number
        const {status, response} = await chatsApi.token(id)
        await this.fetchUsers()
        if (status === 200) {
            const {token} = JSON.parse(response)
            Store.setState({token})
            this.socket = new MessageSocket()
            await this.socket.init()
            this.socket.getOld()

            this.listenerNewMessage()
            this.listenerOldMessages()

        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }

    }

    sendMessage(msg: string) {
        this.socket?.sendMessage(msg)
    }

    listenerNewMessage() {
        this.socket?.registerEvents(MessageSocket.EVENTS.message, (newMessage: IMessage) => {
            Store.setState(({messages}) => ({
                messages: [...messages, newMessage]
            }))
        })
    }

    listenerOldMessages() {
        this.socket?.registerEvents(MessageSocket.EVENTS.getOld, (oldMessages: IMessage[]) => {
            Store.setState(({messages}) => ({
                messages: [...messages, ...oldMessages]
            }))
        })
    }

    closeSocket() {
        this.socket?.close()
    }
}
