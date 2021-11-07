import {ImageUpload} from "../../../../blocks/ImageUpload";
import {UserAvatarController} from "../../../../controllers/userAvatar";
import {selectUser} from "../../../../modules/Store/selectors/user";
import {IAsyncStoreState, Store} from "../../../../modules";
import {AuthController} from "../../../../controllers/auth";

export class SettingAvatar extends ImageUpload{
    controller: UserAvatarController

    constructor() {
        const {avatar} = selectUser(Store.getState())
        const controller = new UserAvatarController()
        const {isLoading, error} = controller.getState()

        super({
            name: 'avatar',
            value: avatar,
            callback: async(file) => {
                await this.controller.changeAvatar(file)
            },
            error,
            isLoading
        });

        this.controller = controller

        Store.addListenerForProps('user', () => {
            const {avatar} = selectUser(Store.getState())
            this.props.image.setProps({
                src: `https://ya-praktikum.tech/api/v2/uploads${avatar}`
            })
        })

        this.controller.eventBus!.on(AuthController.EVENT, ({isLoading, error}: IAsyncStoreState) => {
            this.setProps({error})
            this.setLoading(isLoading)
        })
    }
}
