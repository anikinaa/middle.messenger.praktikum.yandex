import { IUser, IUserChat } from '@models/user'
import { IChat } from '@models/chat'
import { IMessage } from '@models/message'

export type IStore = {
    userId: number | null
    user: IUser | null
    chats: IChat[]
    activeChat: number | null
    token: string | null
    usersChat: {
        data: IUserChat[] | null
        allLoad: boolean
    }
    searchUsersChat: IUser[]
    messages: {
        data: IMessage[]
        allLoad: boolean
    }
}
