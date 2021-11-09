import {ChatsApi} from "../api/chats";
import { errorCatch, Store } from "../modules";

export const chatsApi = new ChatsApi();

export class ChatsController{

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
}
