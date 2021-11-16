import {
    AsyncStore, debounce, errorCatch, loading, Store,
} from '../modules'
import { selectActiveIdChat } from '../modules/Store/selectors/chats'
import { selectNewUser, selectUsersChatData } from '../modules/Store/selectors/chatUsers'
import { IUser, IUserChat, UserRule } from '../models/user'
import { ChatsApi } from '../api/chats'
import { UserApi } from '../api/user'
import { getNameImage } from '../utils/urlImages'

const chatsApi = new ChatsApi()
const userApi = new UserApi()

export class ChatUsersController extends AsyncStore {
    searchLogin: string

    constructor() {
        super()
        this.searchLogin = ''
    }

    @errorCatch
    @loading
    async fetchUsers() {
        const id = selectActiveIdChat(Store.getState()) as number
        const usersChat = selectUsersChatData(Store.getState())
        const offset = usersChat.length

        const { status, response } = await chatsApi.users({
            id,
            offset,
            limit: 10,
        })

        if (status === 200) {
            const newUsersChat = JSON.parse(response) as IUserChat[]
            Store.setState({
                usersChat: {
                    data: [...newUsersChat, ...usersChat],
                    allLoad: newUsersChat.length === 0,
                },
            })
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }

    resetUser() {
        Store.setState({
            usersChat: {
                data: [],
                allLoad: false,
            },
        })
    }

    @debounce
    @loading
    async search(login: string | undefined = this.searchLogin) {
        if (login) {
            this.searchLogin = login
            const { status, response } = await userApi.search(login as string)

            if (status === 200) {
                const searchUsersChat = JSON.parse(response) as IUser[]
                Store.setState({ searchUsersChat })
            } else {
                throw new Error('Ошибка, попробуйте еще раз')
            }
        } else {
            Store.setState({
                searchUsersChat: [],
            })
        }
    }

    resetSearchUser() {
        Store.setState({
            searchUsersChat: [],
        })
    }

    @errorCatch
    @loading
    async addUser(id: number) {
        const chatId = selectActiveIdChat(Store.getState()) as number
        const { status, response } = await chatsApi.addUser({
            users: [id],
            chatId,
        })

        if (status === 200) {
            const newUser: IUser = selectNewUser({ state: Store.getState(), id })
            const user: IUserChat = {
                ...newUser,
                role: UserRule.regular,
                avatar: getNameImage(newUser.avatar),
            }
            Store.setState((state) => ({
                ...state,
                usersChat: {
                    data: [...state.usersChat.data!, user],
                    allLoad: state.usersChat.allLoad,
                },
            }))
        } else {
            const { reason } = JSON.parse(response)
            this.setError(reason)
        }
    }

    @errorCatch
    @loading
    async deleteUser(id: number) {
        const chatId = selectActiveIdChat(Store.getState()) as number
        const { status, response } = await chatsApi.deleteUser({
            users: [id],
            chatId,
        })

        if (status === 200) {
            Store.setState((state) => ({
                ...state,
                usersChat: {
                    data: state.usersChat.data!.filter((user) => user.id !== id),
                    allLoad: state.usersChat.allLoad,
                },
            }))
        } else {
            const { reason } = JSON.parse(response)
            this.setError(reason)
        }
    }
}
