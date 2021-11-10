import {Store} from "../Store";
import {IStore} from "../types";
import {IUserChat} from "../../../models/user";
import { getUrlImage } from '../../../utils/urlImages'

export const selectUsersChatData = Store.makeSelector<IUserChat[]>(
    (state: IStore) => state.usersChat.data
)

export const selectUsersChat = Store.makeSelector<IUserChat[]>(
    (state: IStore) => state.usersChat.data?.map(user => ({
        ...user,
        avatar: getUrlImage(user.avatar)
    }))
)
