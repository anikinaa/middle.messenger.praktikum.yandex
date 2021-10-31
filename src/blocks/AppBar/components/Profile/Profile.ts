import { Block, Template } from '../../../../modules'
import { Avatar } from '../../../../components'
import { IAppBarProfile } from './types'
import _template from './template.tpl'

const template = new Template(_template)

const avatar = new Avatar({
    props: {
        src: '/static/images/avatar.jpg',
    },
})

export class AppBarProfile extends Block<IAppBarProfile> {
    constructor() {
        super({
            props: {
                avatar,
                linkProfile: './profile.html',
                linkLogout: './login.html',
                name: 'Andrey',
            },
            attributes: {
                class: 'my-profile',
            },
            template,
        })
    }
}
