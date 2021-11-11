import { Block, Template } from '../../../../modules'
import { UserListItem } from './components/Item'
import _template from './template.tpl'

const template = new Template(_template)

type IUserListProps = {
    users: UserListItem[]
}

type IUserList<T> = {
    props: {
        users: T[]
    }
}

export class UserList<T = any> extends Block<IUserListProps>{

    constructor({props: {users}}: IUserList<T>) {
        super({
            props: {
                users: UserList.getUsersList<T>(users)
            },
            tagName: 'ul',
            attributes: {
                class: 'chat-user'
            },
            template
        })
    }

    setProps({ users }: any) {
        const userT = users as unknown as T[]
        super.setProps({
            users: UserList.getUsersList<T>(userT)
        });
    }

    static getUsersList<T>(users: T[]): UserListItem[] {
        return users.map(user => new UserListItem({
            props: user
        }))
    }
}
