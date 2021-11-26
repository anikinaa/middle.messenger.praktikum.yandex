import { Fetch } from '../modules/Fetch'
import { BaseAPI } from '../modules/BaseAPI'
import {
    IRequestUserSearch, IUser, IUserPassword, IUserUpdate,
} from '../models/user'

const chatAPIInstance = new Fetch('/user')

/* eslint-disable class-methods-use-this */
export class UserApi extends BaseAPI {
    // @ts-ignore
    update(data: IUserUpdate) {
        return chatAPIInstance.put<IUserUpdate, IUser>('/profile', { data })
    }

    // @ts-ignore
    avatar(data: FormData) {
        return chatAPIInstance.put<FormData, IUser>('/profile/avatar', {
            formData: true,
            data,
        })
    }

    // @ts-ignore
    password(data: IUserPassword) {
        return chatAPIInstance.put<IUserPassword>('/password', { data })
    }

    search(data: IRequestUserSearch) {
        return chatAPIInstance.post<IRequestUserSearch, IUser[]>('/search', { data })
    }
}
/* eslint-enable class-methods-use-this */
