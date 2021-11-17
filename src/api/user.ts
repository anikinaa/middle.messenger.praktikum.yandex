import { Fetch } from '../modules'
import { BaseAPI } from '../modules/BaseAPI'
import { IUserPassword, IUserUpdate } from '../models/user'

const chatAPIInstance = new Fetch('/user')

/* eslint-disable class-methods-use-this */
export class UserApi extends BaseAPI {
    // @ts-ignore
    update(data: IUserUpdate) {
        return chatAPIInstance.put<IUserUpdate>('/profile', { data })
    }

    // @ts-ignore
    avatar(data: FormData) {
        return chatAPIInstance.put<FormData>('/profile/avatar', {
            formData: true,
            data,
            headers: {},
        })
    }

    // @ts-ignore
    password(data: IUserPassword) {
        return chatAPIInstance.put<IUserPassword>('/password', { data })
    }

    search(login: string) {
        return chatAPIInstance.post<{ login: string }>('/search', { data: { login } })
    }
}
/* eslint-enable class-methods-use-this */
