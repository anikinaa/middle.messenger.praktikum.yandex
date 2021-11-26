import { Fetch } from '../modules/Fetch'
import { BaseAPI } from '../modules/BaseAPI'
import { IChat, IChatRequest, IChatTitle } from '../models/chat'
import { IRequestAddDelUser, IRequestUsersChat, IUserChat } from '../models/user'

const chatAPIInstance = new Fetch('/chats')

/* eslint-disable class-methods-use-this */
export class ChatsApi extends BaseAPI {
    // @ts-ignore
    request(data: IChatRequest = {}) {
        return chatAPIInstance.get<IChatRequest, IChat[]>('', { data })
    }

    // @ts-ignore
    create(data: IChatTitle) {
        return chatAPIInstance.post<IChatTitle>('', { data })
    }

    usersChat(data: IRequestUsersChat) {
        const { id, ...query } = data
        return chatAPIInstance.get<Omit<IRequestUsersChat, 'id'>, IUserChat[]>(`/${id}/users`, { data: query })
    }

    addUser(data: IRequestAddDelUser) {
        return chatAPIInstance.put<IRequestAddDelUser>('/users', { data })
    }

    deleteUser(data: IRequestAddDelUser) {
        return chatAPIInstance.delete<IRequestAddDelUser>('/users', { data })
    }

    token(id: number) {
        return chatAPIInstance.post<undefined, {token: string}>(`/token/${id}`)
    }
}

/* eslint-enable class-methods-use-this */
