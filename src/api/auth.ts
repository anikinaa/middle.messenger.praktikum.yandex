import { Fetch } from '../modules'
import { BaseAPI } from '../modules/BaseAPI'
import { ISignInFormModel } from '../models/signIn'
import { ISignUpRequestModel } from '../models/signUp'

const chatAPIInstance = new Fetch('/auth')

/* eslint-disable class-methods-use-this */
export class AuthApi extends BaseAPI {
    // @ts-ignore
    request(data: ISignInFormModel) {
        return chatAPIInstance.post<ISignInFormModel>('/signin', { data })
    }

    // @ts-ignore
    create(data: ISignUpRequestModel) {
        return chatAPIInstance.post('/signup', { data })
    }

    user() {
        return chatAPIInstance.get('/user')
    }

    delete() {
        return chatAPIInstance.post('/logout')
    }
}
/* eslint-enable class-methods-use-this */
