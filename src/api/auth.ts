import { Fetch } from '../modules'
import { BaseAPI } from '../modules/BaseAPI'
import { ISignInFormModel } from '../models/signIn'
import {
    ISignUpRequestModel,
    ISignUpResponseModel,
} from '../models/signUp'
import { IUser } from '../models/user'

const chatAPIInstance = new Fetch('/auth')

/* eslint-disable class-methods-use-this */
export class AuthApi extends BaseAPI {
    // @ts-ignore
    request(data: ISignInFormModel) {
        return chatAPIInstance.post<ISignInFormModel>('/signin', { data })
    }

    // @ts-ignore
    create(data: ISignUpRequestModel) {
        return chatAPIInstance.post<ISignUpRequestModel, ISignUpResponseModel>('/signup', { data })
    }

    user() {
        return chatAPIInstance.get<undefined, IUser>('/user')
    }

    delete() {
        return chatAPIInstance.post('/logout')
    }
}
/* eslint-enable class-methods-use-this */
