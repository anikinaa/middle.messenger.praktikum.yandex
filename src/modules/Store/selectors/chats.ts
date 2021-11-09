import {Store} from "../Store";
import {IStore} from "../types";
import { IChat } from '../../../models/chat'
import { getDateTime } from '../../../utils/dateTime'
import { getUrlImage } from '../../../utils/urlImages'

export const selectChats = Store.makeSelector<IChat[]>(
    (state: IStore) => state.chats,
    (chats: IChat[] | null) => chats ? chats.map(chat => ({
        ...chat,
        unread_count: chat.unread_count || null,
        avatar: getUrlImage(chat.avatar),
        last_message: chat.last_message ? {
            time: getDateTime(chat.last_message.time),
            content: chat.last_message.content,
            user: {
                ...chat.last_message.user,
                avatar: getUrlImage(chat.last_message.user.avatar)
            }
        } : {}
    })) : []
)
