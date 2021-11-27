import { Block, Store, Template, Router, routes } from '@modules'
import { selectUser } from '@modules/Store/selectors/user'
import { Avatar } from '@components'
import { IAppBarProfileProps } from './types'
import _template from './template.tpl'
import { UserController } from '@controllers/user'

const template = new Template(_template)

export class AppBarProfile extends Block<IAppBarProfileProps> {
    controller: UserController | undefined

    constructor() {
        const { avatar: src, display_name, first_name } = selectUser(Store.getState())

        const avatar = new Avatar({
            props: { src },
        })

        super({
            props: {
                avatar,
                linkProfile: routes.settings,
                name: display_name || first_name,
            },
            attributes: {
                class: 'my-profile',
            },
            template,
            events: {
                click: async (e) => {
                    const el = e.target as HTMLElement
                    if (el.classList.contains('my-profile_logout')) {
                        await this.controller!.logout()
                    } else {
                        Router.go(routes.settings)
                    }
                    e.preventDefault()
                },
            },
        })

        Store.addListenerForProps('user', this.updateStore.bind(this))
        this.controller = new UserController()
        this.controller!.response()?.then()
    }

    updateStore() {
        const { avatar: src, display_name, first_name } = selectUser(Store.getState())
        this.setProps({
            name: display_name || first_name,
        })
        this.props.avatar.setProps({ src })
    }

    componentWillUnmount() {
        Store.removeListenerForProps('user', this.updateStore.bind(this))
    }
}
