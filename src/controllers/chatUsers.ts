import {AsyncStore, errorCatch, debounce, Store, loading} from "../modules";
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
    @loading
    async fetchUsers() {
        console.log('fetchUsers')
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
        if (login) {
            const {status, response} = await userApi.search(login as string)

            if (status === 200) {
                const searchUsersChat = JSON.parse(response) as IUser[]
                Store.setState({searchUsersChat})
            } else {
                throw new Error('Ошибка, попробуйте еще раз')
            }
        } else {
            Store.setState({
                searchUsersChat: []
            })
        }
    }

    resetSearchUser() {
        Store.setState({
            searchUsersChat: []
        })
    }

    @errorCatch
    @loading
    async addUser(id: number) {
        console.log('deleteUser')
        const chatId = selectActiveIdChat(Store.getState()) as number
        const {status, response} = await chatsApi.addUser({
            users: [id],
            chatId
        })

        console.log('status',status)
        if (status === 200) {
            console.log('await fetchUsers', this.fetchUsers)
            await this.fetchUsers()
        } else {
            const {reason} = JSON.parse(response)
            this.setError(reason)
        }
    }

    @errorCatch
    @loading
    async deleteUser(id: number) {
        console.log('deleteUser')
        const chatId = selectActiveIdChat(Store.getState()) as number
        const {status, response} = await chatsApi.deleteUser({
            users: [id],
            chatId
        })

        if (status === 200) {
            await this.fetchUsers()
        } else {
            const {reason} = JSON.parse(response)
            this.setError(reason)
        }
    }
}
