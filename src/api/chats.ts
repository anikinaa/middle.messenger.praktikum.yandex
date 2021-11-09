import {HTTPTransport} from "../modules";
import {BaseAPI} from "../modules/BaseAPI";

const chatAPIInstance = new HTTPTransport('/chats');

export class ChatsApi extends BaseAPI {
    // @ts-ignore
    request(data: {
        offset?: string
        limit?: string
        title?: string
    } = {}) {
        return chatAPIInstance.get('/', {data})
    }

    // @ts-ignore
    create(data: {
        title: string
    }) {
        return chatAPIInstance.post('/', {data})
    }

    // @ts-ignore
    addUser(data: {
        users: number[]
        chatId: number
    }) {
        return chatAPIInstance.post('/users', {data})
    }

    // @ts-ignore
    deleteUser(data: {
        users: number[]
        chatId: number
    }) {
        return chatAPIInstance.delete('/users', {data})
    }
}
