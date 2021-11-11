import {AsyncStore, errorCatch, debounce, Store} from "../modules";
import {selectActiveIdChat} from "../modules/Store/selectors/chats";
import { selectUsersChatData } from "../modules/Store/selectors/chatUsers";
import { IUser, IUserChat } from "../models/user";
import { ChatsApi } from '../api/chats'
import { UserApi } from '../api/user'

const chatsApi = new ChatsApi();
const userApi = new UserApi()

export class ChatUsersController extends AsyncStore{
    constructor() {
        super()
    }

    @errorCatch
    async fetchUsers() {
        const id = selectActiveIdChat(Store.getState()) as number
        const usersChat = selectUsersChatData(Store.getState())
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
                    data: [...newUsersChat, ...usersChat],
                    allLoad: newUsersChat.length === 0
                }
            })
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }

    resetUser() {
        Store.setState({
            usersChat: {
                data: [],
                allLoad: false
            }
        })
    }

    @debounce
    async search(login: string | undefined) {
        if (!login && login?.length === 0) {
            return
        }
        const {status, response} = await userApi.search(login as string)

        if (status === 200) {
            const searchUsersChat = JSON.parse(response) as IUser[]
            Store.setState({searchUsersChat})
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }

}
