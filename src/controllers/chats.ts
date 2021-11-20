import { ChatsApi } from '../api/chats'
import {
    AsyncStore, errorCatch, errorStateCatch, loading, Store,
} from '../modules'
import { MessengerPage } from '../pages/Messenger'
import { IChatTitle } from '../models/chat'

const chatsApi = new ChatsApi()

/* eslint-disable class-methods-use-this */
export class ChatsController extends AsyncStore {
    @errorCatch
    async fetchChats() {
        const chats = await chatsApi.request()
        Store.setState({ chats })
    }

    @errorStateCatch
    @loading
    async addChat(data: IChatTitle) {
        await chatsApi.create(data)
        MessengerPage.open()
        await this.fetchChats()
    }

    select(activeChat: number) {
        Store.setState({ activeChat })
    }
}

/* eslint-enable class-methods-use-this */
