import {ChatsApi} from "../api/chats";
import { AsyncStore, errorCatch, errorStateCatch, loading, Store } from "../modules";
import { MessengerPage } from '../pages/Messenger'
import { IChatTitle } from '../models/chat'

const chatsApi = new ChatsApi();

export class ChatsController extends AsyncStore{
    constructor() {
        super()
    }

    @errorCatch
    async fetchChats() {
        const {status, response} = await chatsApi.request()
        if (status === 200) {
            Store.setState({
                chats: JSON.parse(response)
            })
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }

    @errorStateCatch
    @loading
    async addChat(data: IChatTitle) {
        this.resetError()
        const {status, response} = await chatsApi.create(data)
        if (status === 200) {
            MessengerPage.open()
            await this.fetchChats()
        } else {
            const {reason} = JSON.parse(response)
            this.setError(reason)
        }
    }

    select(activeChat: number) {
        Store.setState({activeChat})
    }

}
