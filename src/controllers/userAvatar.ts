import { UserApi } from '@api/user'
import { AsyncStore, Store } from '@modules'
import { errorStateCatch, loading } from '@utils/decorators'

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
