import {Block, IAsyncStoreState, Template} from '../../../../../../modules'
import _template from './template.tpl'
import { IUserListItem, IUserListItemProps } from './types'
import { Avatar, ButtonCircle } from '../../../../../../components'
import { joinClassName } from '../../../../../../utils/elementAttr'
import deleteIcon from '../../../../../../assets/icons/delete.svg'
import { ChatUsersController } from '../../../../../../controllers/chatUsers'

const template = new Template(_template)

export class UserListItem extends Block<IUserListItemProps> {

    controller: ChatUsersController

    constructor({ props, attributes, events }: IUserListItem) {
        // @ts-ignore
        const { avatar: src, display_name, second_name, first_name, id, role, login } = props

        const deleteBtn = role === 'regular' ? new ButtonCircle({
            props: {
                icon: deleteIcon,
            },
            attributes: {
                class: 'chat-users_item_delete button-circle__gray',
            },
            events: {
                click: async () => {
                    await this.controller.deleteUser(id)
                }
            }
        }) : undefined


        super({
            props: {
                login,
                name: display_name || `${second_name} ${first_name}`,
                avatar: new Avatar({
                    props: {
                        src,
                        className: 'avatar__small',
                    },
                }),
                deleteBtn,
            },
            template,
            attributes: {
                class: joinClassName(attributes, 'chat-users_item'),
                // @ts-ignore
                'data-id': id,
            },
            events,
            tagName: 'li',
        })

        this.controller = new ChatUsersController()
        this.controller.eventBus!.on(ChatUsersController.EVENT, this.updateLocalStore.bind(this))
    }

    updateLocalStore({isLoading}: IAsyncStoreState){
        this.element?.classList.toggle('loading', isLoading)
    }

    componentWillUnmount() {
        this.controller.eventBus!.off(ChatUsersController.EVENT, this.updateLocalStore.bind(this))
    }
}
