import { UserApi } from '../api/user'
import { errorStateCatch, loading, Store } from '../modules'
import { AuthController } from './auth'
import { AuthApi } from '../api/auth'
import { IUserUpdate } from '../models/user'
import { MessengerPage } from '../pages/Messenger'

const authApi = new AuthApi()
export const userApi = new UserApi()

export class UserController extends AuthController {
    @errorStateCatch
    @loading
    // eslint-disable-next-line class-methods-use-this
    async response() {
        const { status, response } = await authApi.user()
        if (status === 200) {
            Store.setState({
                user: JSON.parse(response),
            })
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }

    @errorStateCatch
    @loading
    async update(data: IUserUpdate) {
        this.resetError()
        const { status, response } = await userApi.update(data)
        if (status === 200) {
            Store.setState({
                user: JSON.parse(response),
            })
            MessengerPage.open()
        } else {
            const { reason } = JSON.parse(response)
            this.setError(reason)
        }
    }
}
