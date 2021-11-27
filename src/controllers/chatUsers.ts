import { AsyncStore, Store } from '@modules'
import {
    debounce, errorCatch, errorStateCatch, loading,
} from '@utils/decorators'
import { selectActiveIdChat } from '@modules/Store/selectors/chats'
import { selectNewUser, selectUsersChatData } from '@modules/Store/selectors/chatUsers'
import { IUserChat, UserRule } from '@models/user'
import { ChatsApi } from '@api/chats'
import { UserApi } from '@api/user'
import { getNameImage } from '@utils/urlImages'

const chatsApi = new ChatsApi()
const userApi = new UserApi()

/* eslint-disable class-methods-use-this */
export class ChatUsersController extends AsyncStore {
    searchLogin: string

    constructor() {
        super()
        this.searchLogin = ''
    }

    @errorCatch
    @loading
    async fetchUsers() {
        const id = selectActiveIdChat(Store.getState())!
        const usersChat = selectUsersChatData(Store.getState())
        const offset = usersChat.length

        const newUsersChat = await chatsApi.usersChat({ id, offset })

        Store.setState({
            usersChat: {
                data: [...newUsersChat, ...usersChat],
                allLoad: newUsersChat.length === 0,
            },
        })
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
            const searchUsersChat = await userApi.search({ login })
            Store.setState({ searchUsersChat })
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

    @errorStateCatch
    @loading
    async addUser(id: number) {
        const chatId = selectActiveIdChat(Store.getState())!

        await chatsApi.addUser({
            users: [id],
            chatId,
        })

        const newUser = selectNewUser({ state: Store.getState(), id })
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
    }

    @errorStateCatch
    @loading
    async deleteUser(id: number) {
        const chatId = selectActiveIdChat(Store.getState())!

        await chatsApi.deleteUser({
            users: [id],
            chatId,
        })

        Store.setState((state) => ({
            ...state,
            usersChat: {
                data: state.usersChat.data!.filter((user) => user.id !== id),
                allLoad: state.usersChat.allLoad,
            },
        }))
    }
}
/* eslint-enable class-methods-use-this */
