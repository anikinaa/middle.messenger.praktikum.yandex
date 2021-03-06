import { IChat } from '@models/chat'
import { getDateTime } from '@utils/dateTime'
import { getUrlImage } from '@utils/urlImages'
import { IStore } from '../types'
import { Store } from '../Store'

export const selectChats = Store.makeSelector<IChat[]>(
    (state: IStore) => state.chats,
    (chats: IChat[] | null) => (chats ? chats.map((chat) => ({
        ...chat,
        unread_count: chat.unread_count || null,
        avatar: getUrlImage(chat.avatar),
        last_message: chat.last_message ? {
            time: getDateTime(chat.last_message.time),
            content: chat.last_message.content,
            user: {
                ...chat.last_message.user,
                avatar: getUrlImage(chat.last_message.user.avatar),
            },
        } : {},
    })) : []),
)

export const selectActiveIdChat = Store.makeSelector<number | null>(
    (state: IStore) => state.activeChat,
)

export const selectActiveChat = Store.makeSelector<IChat | undefined>(
    (state: IStore) => {
        const activeId = state.activeChat
        if (activeId === null) {
            return undefined
        }
        const chat = state.chats!.find(({ id }) => activeId === id)
        return chat || undefined
    },
)

export const selectTokenChat = Store.makeSelector<string>(
    (state: IStore) => state.token,
)
