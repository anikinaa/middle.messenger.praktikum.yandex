import {Block, Store, Template} from '../../../../modules'
import { Avatar } from '../../../../components'
import { IAppBarHeaderProps } from './types'
import _template from './template.tpl'
import {selectActiveChat} from "../../../../modules/Store/selectors/chats";

const template = new Template<IAppBarHeaderProps>(_template)

export class AppBarHeader extends Block<IAppBarHeaderProps> {
    constructor() {
        const user = selectActiveChat(Store.getState())
        const src = user?.avatar
        const title = user?.avatar

        const avatar = new Avatar({
            props: {src },
        })

        super({
            props: {
                avatar,
                title,
            },
            attributes: {
                class: `chat-header ${title ? '' : 'hidden'}`,
            },
            template,
        })

        Store.addListenerForProps('activeChat', () => {
            const user = selectActiveChat(Store.getState())
            const src = user?.avatar
            const title = user?.title

            title && this.setProps({title})
            src && this.props.avatar.setProps({src})

            this.element?.classList.toggle('hidden', !Boolean(title))
        })

    }
}
