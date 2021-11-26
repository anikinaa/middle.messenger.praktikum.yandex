import { UserApi } from '../api/user'
import { AsyncStore } from '../modules/AsyncStore'
import { errorStateCatch, loading } from '../utils/decorators'
import { Store } from '../modules/Store'

export const userApi = new UserApi()

export class UserAvatarController extends AsyncStore {
    @errorStateCatch
    @loading
    // eslint-disable-next-line class-methods-use-this
    async changeAvatar(file: File) {
        const formData = new FormData()
        formData.append('avatar', file)
        const user = await userApi.avatar(formData)
        Store.setState({ user })
    }
}
