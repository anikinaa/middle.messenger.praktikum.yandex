import { Store, IAsyncStoreState } from '@modules'
import { ImageUpload } from '@blocks'
import { selectUser } from '@modules/Store/selectors/user'
import { UserAvatarController } from '@controllers/userAvatar'
import { AuthController } from '@controllers/auth'

export class SettingAvatar extends ImageUpload {
    controller: UserAvatarController

    constructor() {
        const { avatar } = selectUser(Store.getState())
        const controller = new UserAvatarController()
        const { isLoading, error } = controller.getState()

        super({
            name: 'avatar',
            value: avatar,
            callback: async (file) => {
                await this.controller.changeAvatar(file)
            },
            error,
            isLoading,
        })

        this.controller = controller

        Store.addListenerForProps('user', this.updateStore.bind(this))

        this.controller.eventBus!.on(AuthController.EVENT, this.updateLocalStore.bind(this))
    }

    updateStore() {
        const { avatar } = selectUser(Store.getState())
        this.props.image.setProps({
            src: avatar,
        })
    }

    updateLocalStore({ isLoading, error }: IAsyncStoreState) {
        this.setProps({ error })
        this.setLoading(isLoading)
    }

    protected componentWillUnmount() {
        this.controller.eventBus!.off(AuthController.EVENT, this.updateLocalStore.bind(this))
    }
}
