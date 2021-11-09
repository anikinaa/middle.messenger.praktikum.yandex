import {Store} from "../Store";
import {IStore} from "../types";
import {IUserChat} from "../../../models/user";

export const selectUsersChat = Store.makeSelector<IUserChat[]>(
    (state: IStore) => state.usersChat.data
)
