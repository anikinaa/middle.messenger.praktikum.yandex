import { AuthApi } from '../api/auth'
import { ISignInFormModel } from '../models/signIn'
import {
    AsyncStore, loading, errorStateCatch, Store,
} from '../modules'
import { ISignUpFormModel, ISignUpRequestModel } from '../models/signUp'
import { MessengerPage } from '../pages/Messenger'
import { SignInPage } from '../pages/SignIn'
import { errorCatch } from '../utils/decorators/errorCatch'
import { setAuthOff, setAuthOn } from '../utils/localStorage'

const authApi = new AuthApi()

export class AuthController extends AsyncStore {
    @errorStateCatch
    @loading
    async signIn(data: ISignInFormModel) {
        this.resetError()
        const { status, response } = await authApi.request(data)
        if (status === 200) {
            localStorage.setItem('isAuth', 'true')
            MessengerPage.open()
        } else {
            const { reason } = JSON.parse(response)
            this.setError(reason)
        }
    }

    @errorStateCatch
    @loading
    async signUp(data: ISignUpFormModel) {
        this.resetError()
        const { password, repeat_password, ...form } = data
        if (password !== repeat_password) {
            this.setError('Введенные пароли не совпадпют')
            return
        }
        const requestData: ISignUpRequestModel = { ...form, password }
        const xhr = await authApi.create(requestData)
        const { status, response } = xhr
        if (status === 200) {
            const { id } = response
            Store.setState({
                userId: id,
            })
            setAuthOn()
            MessengerPage.open()
        } else {
            const { reason } = JSON.parse(response)
            this.setError(reason)
        }
    }

    @errorCatch
    // eslint-disable-next-line class-methods-use-this
    async logout() {
        const { status } = await authApi.delete()
        if (status === 200) {
            setAuthOff()
            SignInPage.open()
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }
}
