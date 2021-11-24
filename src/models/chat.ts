import { IUser } from './user'

export type IChatRequest = {
    offset?: string
    limit?: string
    title?: string
}

export type IChat = {
    id: number
    title: string
    avatar: string
    unread_count: number
    last_message: {
        user: Omit<IUser, 'id' | 'display_name'>
        time: string
        content: string
    }
}

export type IChatTitle = Pick<IChat, 'title'>
