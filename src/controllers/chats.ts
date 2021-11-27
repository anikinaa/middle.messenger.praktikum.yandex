import { ChatsApi } from '@api/chats'
import { AsyncStore, Store, Router, routes } from '@modules'
import { errorStateCatch, errorCatch, loading } from '@utils/decorators'
import { IChatTitle } from '@models/chat'

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
        Router.go(routes.messenger)
        await this.fetchChats()
    }

    select(activeChat: number) {
        Store.setState({ activeChat })
    }
}

/* eslint-enable class-methods-use-this */
