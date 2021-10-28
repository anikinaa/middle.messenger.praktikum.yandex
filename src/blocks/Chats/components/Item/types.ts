import { Avatar } from '../../../../components'
import { IBlock } from '../../../../modules'

export interface IChatsItemProps {
    href: string;
    avatar: Avatar;
    title: string;
    lastMessage?: {
        content: string;
        time: string;
    };
    unreadCount: number;
}

export type IChatsItem = Omit<IBlock<IChatsItemProps>, 'template' | 'tagName'>;
