import { Block, Template } from '../../../../../../../../modules'
import _template from './template.tpl'
import { IUserListItem, IUserListItemProps } from './types'
import { Avatar } from '../../../../../../../../components'

const template = new Template(_template)

export class UserListItem extends Block<IUserListItemProps>{
    constructor({props}: IUserListItem) {
        const {avatar: src, display_name, second_name, first_name} = props
        super({
            props: {
                name: display_name || `${second_name} ${first_name}`,
                avatar: new Avatar({
                    props: {
                        src,
                        className: 'avatar__small'
                    }
                })
            },
            template,
            attributes: {
                class: 'chat-user-list'
            },
            tagName: 'li'
        })
    }
}