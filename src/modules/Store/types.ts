import {IUserForm} from "../../models/user";
import { IChat } from '../../models/chat'

export type IStore = {
    userId: number | null
    user: IUserForm | null
    chats: IChat[] | null
}
