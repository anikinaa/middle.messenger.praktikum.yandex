import { UserApi } from '@api/user'
import { AsyncStore, Router, routes } from '@modules'
import { errorStateCatch, loading } from '@utils/decorators'
import { IUserPasswordForm } from '@models/user'

export const userApi = new UserApi()

export class UserPasswordController extends AsyncStore {
    @errorStateCatch
    @loading
    async changePassword(data: IUserPasswordForm) {
        const { oldPassword, newPassword, repeat_newPassword } = data
        if (newPassword !== repeat_newPassword) {
            this.setError('Введенные пароли не совпадпют')
            return
        }
        await userApi.password({ oldPassword, newPassword })
        Router.go(routes.messenger)
    }
}
