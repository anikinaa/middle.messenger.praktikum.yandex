import {UserApi} from "../api/user-api";
import {AsyncStore, errorStateCatch, loading} from "../modules";
import { IUserPasswordForm } from '../models/user'
import { SettingsPage } from '../pages/Settings'

export const userApi = new UserApi();

export class UserPasswordController extends AsyncStore{
    constructor() {
        super();
    }

    @errorStateCatch
    @loading
    async changePassword(data: IUserPasswordForm) {
        this.resetError()
        const {oldPassword, newPassword, repeat_newPassword} = data
        if (newPassword !== repeat_newPassword) {
            this.setError('Введенные пароли не совпадпют')
            return
        }
        const {status, response} = await userApi.password({ oldPassword, newPassword })
        if (status === 200) {
            SettingsPage.open()
        } else {
            const {reason} = JSON.parse(response)
            this.setError(reason)
        }
    }


}
