import {Block, Store, Template} from '../../../../modules'
import {Avatar} from '../../../../components'
import {IAppBarProfileProps} from './types'
import _template from './template.tpl'
import {AuthController} from "../../../../controllers/auth";
import {SettingsPage} from "../../../../pages/Settings";
import {selectUser} from "../../../../modules/Store/selectors/user";

const template = new Template(_template)

export class AppBarProfile extends Block<IAppBarProfileProps> {
    controller: AuthController | undefined

    constructor() {
        const {avatar: src, display_name, first_name} = selectUser(Store.getState())

        const avatar = new Avatar({
            props: {src},
        })

        super({
            props: {
                avatar,
                linkProfile: SettingsPage.pathname,
                name: display_name || first_name,
            },
            attributes: {
                class: 'my-profile',
            },
            template,
            events: {
                click: async (e) => {
                    const el = e.target as HTMLElement;
                    if (el.classList.contains('my-profile_logout')) {
                        await this.controller!.logout()
                    } else if (el.classList.contains('my-profile_user')) {
                        SettingsPage.open()
                        e.preventDefault()
                    }
                }
            }
        })

        Store.addListenerForProps('user', () => {
            const {avatar: src, display_name, first_name} = selectUser(Store.getState())
            this.setProps({
                name: display_name || first_name
            })
            this.props.avatar.setProps({src})
        })
    }

    protected componentDidMount(oldProps: {} | IAppBarProfileProps) {
        super.componentDidMount(oldProps);
        this.controller = new AuthController()
        this.controller?.user()
    }
}
