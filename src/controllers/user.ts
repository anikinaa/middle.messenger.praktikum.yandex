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
        const user = await authApi.user()
        Store.setState({ user })
    }

    @errorStateCatch
    @loading
    // eslint-disable-next-line class-methods-use-this
    async update(data: IUserUpdate) {
        const user = await userApi.update(data)
        Store.setState({ user })
        MessengerPage.open()
    }
}
