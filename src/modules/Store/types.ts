import { IUser, IUserChat, IUserForm } from '../../models/user'
import { IChat } from '../../models/chat'
import { IMessage } from '../../models/message'

export type IStore = {
    userId: number | null
    user: IUserForm | null
    chats: IChat[]
    activeChat: number | null
    token: string | null
    usersChat: {
        data: IUserChat[] | null
        allLoad: boolean
    }
    searchUsersChat: IUser[],
    messages: {
        data: IMessage[]
        allLoad: boolean
    }
}
