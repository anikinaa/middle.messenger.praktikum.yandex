import { IUserForm } from '@models/user'
import { getUrlImage } from '@utils/urlImages'
import { Store } from '../Store'
import { IStore } from '../types'

export const selectUser = Store.makeSelector<IUserForm>(
    (state: IStore) => state.user,
    (user: IUserForm | null) => (user ? {
        ...user,
        avatar: getUrlImage(user.avatar),
    } : {}),
)

export const selectUserId = Store.makeSelector<IUserForm>(
    (state: IStore) => state.user?.id,
)
