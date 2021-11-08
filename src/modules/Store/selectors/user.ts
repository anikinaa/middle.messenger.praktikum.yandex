import {Store} from "../Store";
import {IStore} from "../types";
import {IUser} from "../../../models/user";

export const selectUser = Store.makeSelector<IUser>(
    (state: IStore) => state.user,
    (user: IUser | null) => user ? {
        ...user,
        avatar: user.avatar ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}` : undefined
    } : {}
)
