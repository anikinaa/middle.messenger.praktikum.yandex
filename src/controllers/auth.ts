import { AuthApi } from '../api/auth'
import { ISignInFormModel } from '../models/signIn'
import { AsyncStore } from '../modules/AsyncStore'
import { Store } from '../modules/Store'
import { loading, errorStateCatch, errorCatch } from '../utils/decorators'
import { ISignUpFormModel, ISignUpRequestModel } from '../models/signUp'
import {Router} from "../modules/Router";
import { setAuthOff, setAuthOn } from '../utils/localStorage'

const authApi = new AuthApi()

export class AuthController extends AsyncStore {
    @errorStateCatch
    @loading
    // eslint-disable-next-line class-methods-use-this
    async signIn(data: ISignInFormModel) {
        await authApi.request(data)
        localStorage.setItem('isAuth', 'true')
        Router.go('/messenger')
    }

    @errorStateCatch
    @loading
    async signUp(data: ISignUpFormModel) {
        const { password, repeat_password, ...form } = data
        if (password !== repeat_password) {
            this.setError('Введенные пароли не совпадпют')
            return
        }
        const requestData: ISignUpRequestModel = { ...form, password }
        const { id } = await authApi.create(requestData)
        Store.setState({
            userId: id as number,
        })
        setAuthOn()
        Router.go('/messenger')
    }

    @errorCatch
    // eslint-disable-next-line class-methods-use-this
    async logout() {
        await authApi.delete()
        setAuthOff()
        Router.go('/')
    }
}
