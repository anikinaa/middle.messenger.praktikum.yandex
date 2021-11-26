import { UserApi } from '../api/user'
import { Store } from '../modules/Store'
import { errorStateCatch, loading } from '../utils/decorators'
import { AuthController } from './auth'
import { AuthApi } from '../api/auth'
import { IUserUpdate } from '../models/user'
import {Router} from "../modules/Router";

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
        Router.go('/messenger')
    }
}
