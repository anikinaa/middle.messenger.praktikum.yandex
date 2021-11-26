import { IUser, IUserChat } from '../../../../../../models/user'
import { Avatar } from '../../../../../../components/Avatar'
import { ButtonCircle } from '../../../../../../components/ButtonCircle'
import { IBlock } from '../../../../../../modules/Block'

export type IUserListItem = Pick<IBlock<IUser | IUserChat>, 'props' | 'attributes' | 'events'> & {
    props: IUser | IUserChat
}

export type IUserListItemProps = {
    login: string
    name: string
    avatar: Avatar
    deleteBtn?: ButtonCircle
}

export type IUserListItemBlock = Pick<IBlock<IUserListItemProps>, 'attributes' | 'events'>
