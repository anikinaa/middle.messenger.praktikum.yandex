import {AsyncStore, errorCatch, Store} from "../modules";
import {chatsApi} from "./chats";
import {selectActiveIdChat} from "../modules/Store/selectors/chats";
import {selectUsersChat} from "../modules/Store/selectors/chatUsers";
import {IUserChat} from "../models/user";

export class ChatUsersController extends AsyncStore{
    constructor() {
        super()
    }

    @errorCatch
    async fetchUsers() {
        const id = selectActiveIdChat(Store.getState()) as number
        const usersChat = selectUsersChat(Store.getState())
        const offset = usersChat.length

        const {status, response} = await chatsApi.users({
            id,
            offset,
            limit: 10
        })

        if (status === 200) {
            const newUsersChat = JSON.parse(response) as IUserChat[]
            Store.setState({
                usersChat: {
                    data: [...usersChat, ...usersChat],
                    allLoad: newUsersChat.length === 0
                }
            })
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }


}
