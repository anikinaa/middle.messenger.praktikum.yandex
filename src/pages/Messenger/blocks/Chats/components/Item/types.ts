import { Avatar } from '../../../../../../components'
import { IBlock } from '../../../../../../modules'

export type IChatsItemProps = {
    id: number
    avatar: Avatar
    title: string
    lastMessage?: {
        content: string
        time: string
    }
    unreadCount: number
}

export type IChatsItem = Omit<IBlock<IChatsItemProps>, 'template' | 'tagName' | 'events'> & {
    props: IChatsItemProps
}
