import { Store } from '../Store'
import { IStore } from '../types'
import { IUser, IUserChat } from '../../../models/user'
import { getUrlImage } from '../../../utils/urlImages'

export const selectUsersChatData = Store.makeSelector<IUserChat[]>(
    (state: IStore) => state.usersChat.data,
)

export const selectUsersChat = Store.makeSelector<IUserChat[]>(
    (state: IStore) => state.usersChat.data?.map((user) => ({
        ...user,
        avatar: getUrlImage(user.avatar),
    })),
)

export const selectResultSearchUser = Store.makeSelector<IUserChat[]>(
    (state: IStore) => {
        const { searchUsersChat, usersChat: { data } } = state
        const idsUsers = data!.map(({ id }) => id)
        return searchUsersChat
            .filter(({ id }) => !idsUsers.includes(id))
            .map((user) => ({
                ...user,
                avatar: getUrlImage(user.avatar),
            }))
    },
)

export const selectNewUser = Store.makeSelector<IUser>(
    ({ state, id }: {state: IStore, id: number}) => {
        const search: IUser[] = selectResultSearchUser(state)
        const user: IUser = search.find((item) => item.id === id)!
        return user
    },
)
