import { Block, IBlock, Template } from '../../../../modules'
import { IUserListItemBlock, UserListItem } from './components/Item'
import _template from './template.tpl'
import { IUser, IUserChat } from '../../../../models/user'

const template = new Template(_template)

type IUserListProps = {
    users: UserListItem[],
    item?: IUserListItemBlock
}

type IUserList = {
    props: {
        users: IUser[] | IUserChat[],
        item?: IBlock<IUserListItemBlock>
    }
}

export class UserList extends Block<IUserListProps> {
    constructor({ props: { users, item = {} } }: IUserList) {
        const { attributes, events } = item

        super({
            props: {
                users: users.map((user) => new UserListItem({
                    props: user,
                    attributes,
                    events,
                })),
                item,
            },
            tagName: 'ul',
            attributes: {
                class: 'chat-users',
            },
            template,
        })
    }

    // @ts-ignore
    setProps({ users }: {
        users: IUser[] | IUserChat[]
    }): void {
        const data = users as unknown as IUser[] | IUserChat[]
        const { item: { attributes, events } = {} } = this.props
        super.setProps({
            users: data.map((user) => new UserListItem({
                props: user,
                attributes,
                events,
            })),
        })
    }
}
