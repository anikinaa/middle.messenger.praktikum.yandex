import { UserApi } from '../api/user'
import {
    AsyncStore, errorStateCatch, loading, Store,
} from '../modules'

export const userApi = new UserApi()

export class UserAvatarController extends AsyncStore {
    @errorStateCatch
    @loading
    // eslint-disable-next-line class-methods-use-this
    async changeAvatar(file: File) {
        this.resetError()
        const formData = new FormData()
        formData.append('avatar', file)
        const { status, response } = await userApi.avatar(formData)
        if (status === 200) {
            Store.setState({
                user: JSON.parse(response),
            })
        } else {
            throw new Error('Ошибка, попробуйте еще раз')
        }
    }
}
