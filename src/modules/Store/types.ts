import { IUser, IUserChat, IUserForm } from "../../models/user";
import { IChat } from '../../models/chat'

export type IStore = {
    userId: number | null
    user: IUserForm | null
    chats: IChat[]
    activeChat: number | null
    usersChat: {
        data: IUserChat[] | null
        allLoad: boolean
    }
    searchUsersChat: IUser[]
}
