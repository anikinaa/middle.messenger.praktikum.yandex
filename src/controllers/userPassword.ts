import { UserApi } from '../api/user'
import { AsyncStore, errorStateCatch, loading } from '../modules'
import { IUserPasswordForm } from '../models/user'
import { SettingsPage } from '../pages/Settings'

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
        SettingsPage.open()
    }
}
