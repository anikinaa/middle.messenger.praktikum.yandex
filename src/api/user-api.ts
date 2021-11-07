import {HTTPTransport} from "../modules";
import {BaseAPI} from "../modules/BaseAPI";
import {IUserPassword, IUserUpdate} from "../models/user";

const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

export class UserApi extends BaseAPI {
    // @ts-ignore
    update(data: IUserUpdate) {
        return chatAPIInstance.put<IUserUpdate>('/profile', {data})
    }

    // @ts-ignore
    avatar(data: FormData) {
        return chatAPIInstance.put<FormData>('/profile/avatar', {
            formData: true,
            data,
            headers: {}
        })
    }

    // @ts-ignore
    password(data: IUserPassword) {
        return chatAPIInstance.put<IUserPassword>('/profile/password', {data})
    }
}
