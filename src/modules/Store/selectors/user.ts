import {Store} from "../Store";
import {IStore} from "../types";
import {IUser} from "../../../models/user";

export const selectUser = Store.makeSelector<IUser>(
    (state: IStore) => state.user,
    (user: IUser | null) => user || {}
)
