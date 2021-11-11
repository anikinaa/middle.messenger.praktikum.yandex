import { Block, Template } from '../../../../modules'
import { UserListItem } from './components/Item'
import _template from './template.tpl'
import { IChatSettingUserListProps } from './types'
import { IUserChat } from '../../../../models/user'

const template = new Template(_template)

type IUserList<T> = {
    props: {
        users: IUserChat[]
    }
}

export class UserList<T extends object> extends Block<T>{

    constructor({props: {users}}: IUserList<T>) {
        super({
            props: {
                users: UserList.getUsersList(users)
            },
            tagName: 'ul',
            attributes: {
                class: 'chat-user'
            },
            template
        })
    }

    setProps({users}: {users: IUserChat[]}) {
        super.setProps({
            users: UserList.getUsersList(users)
        })
    }

    static getUsersList(users: IUserChat[]): UserListItem[] {
        return users.map(user => new UserListItem({
            props: user
        }))
    }
}
