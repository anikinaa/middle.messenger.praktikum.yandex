import { IUserChat } from '../../../../../../../../models/user'
import { Avatar } from '../../../../../../../../components'

export type IUserListItem = {
    props: IUserChat
}

export type IUserListItemProps = {
    name: string,
    avatar: Avatar
}