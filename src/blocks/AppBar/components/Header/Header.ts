import { Block, Template } from '../../../../modules'
import { Avatar } from '../../../../components'
import { AppBarHeaderProps } from './types'
import _template from './template.tpl'

const template = new Template<AppBarHeaderProps>(_template)

const avatar = new Avatar({
    props: {
        src: '/static/images/avatar.jpg',
    },
})

export class AppBarHeader extends Block<AppBarHeaderProps> {
    constructor() {
        super({
            props: {
                avatar,
                name: 'Title active chat',
            },
            attributes: {
                class: 'chat-header',
            },
            template,
        })
    }
}
