import {HTTPTransport} from "../modules";
import {BaseAPI} from "../modules/BaseAPI";
import { IChatTitle } from '../models/chat'

const chatAPIInstance = new HTTPTransport('/chats');

export class ChatsApi extends BaseAPI {
    // @ts-ignore
    request(data: {
        offset?: string
        limit?: string
        title?: string
    } = {}) {
        return chatAPIInstance.get('', {data})
    }

    // @ts-ignore
    create(data: IChatTitle) {
        return chatAPIInstance.post('', {data})
    }

    users(data: {
        id: number
        offset?: number
        limit?: number
        name?: string
        email?: string
    }) {
        const {id, ...query} = data
        return chatAPIInstance.get(`/${id}/users`, {data: query})
    }

    addUser(data: {
        users: number[]
        chatId: number
    }) {
        return chatAPIInstance.put('/users', {data})
    }

    deleteUser(data: {
        users: number[]
        chatId: number
    }) {
        return chatAPIInstance.delete('/users', {data})
    }

    token(id: number) {
        return chatAPIInstance.post(`/token/${id}`)
    }
}
