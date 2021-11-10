import { Block, Store, Template } from '../../../../../../modules'
import { selectUsersChat } from '../../../../../../modules/Store/selectors/chatUsers'
import { UserListItem } from './components/Item'
import _template from './template.tpl'
import { IChatSettingUserListProps } from './types'
import { IUserChat } from '../../../../../../models/user'
import { ChatUsersController } from '../../../../../../controllers/chatUsers'

const template = new Template(_template)

export class ChatSettingUserList extends Block<IChatSettingUserListProps>{
    controller: ChatUsersController
    constructor() {
        const users = selectUsersChat(Store.getState())
        super({
            props: {
                users: ChatSettingUserList.getUsersList(users)
            },
            tagName: 'ul',
            attributes: {
                class: 'chat-user'
            },
            template
        })

        Store.addListenerForProps('usersChat', () => {
            const users = selectUsersChat(Store.getState())
            // console.log(users)
            this.setProps({
                users: ChatSettingUserList.getUsersList(users)
            })
        })

        this.controller = new ChatUsersController()
        this.controller.fetchUsers()?.then()
    }

    static getUsersList(users: IUserChat[]): UserListItem[] {
        return users.map(user => new UserListItem({
            props: user
        }))
    }
}
