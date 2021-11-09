import {AuthApi} from "../api/auth";
import {ISignInFormModel} from "../models/signIn";
import {AsyncStore, loading, errorStateCatch, Store} from "../modules";
import {ISignUpFormModel, ISignUpRequestModel} from "../models/signUp";
import {MessengerPage} from "../pages/Messenger";
import {SignInPage} from "../pages/SignIn";
import {errorCatch} from "../utils/errorCatch";

const authApi = new AuthApi();

export class AuthController extends AsyncStore {

    constructor() {
        super()
    }

    @errorStateCatch
    @loading
    async signIn(data: ISignInFormModel) {
        this.resetError()
        const {status, response} = await authApi.request(data)
        if (status === 200) {
            localStorage.setItem('isAuth', 'true')
            MessengerPage.open()
        } else {
            const {reason} = JSON.parse(response)
            this.setError(reason)
        }
    }

    @errorStateCatch
    @loading
    async signUp(data: ISignUpFormModel) {
        this.resetError()
        const {password, repeat_password, ...form} = data
        if (password !== repeat_password) {
            this.setError('Введенные пароли не совпадпют')
            return
        }
        const requestData: ISignUpRequestModel = {...form, password}
        const xhr = await authApi.create(requestData)
        const {status, response} = xhr
        if (status === 200) {
            const {id} = response
            Store.setState({
                userId: id
            })
            localStorage.setItem('isAuth', 'true')
            MessengerPage.open()
        } else {
            const {reason} = JSON.parse(response)
            this.setError(reason)
        }
    }

    @errorCatch
    async logout() {
        const {status} = await authApi.delete()
        if (status === 200) {
            localStorage.setItem('isAuth', 'false')
            SignInPage.open()
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }
}
