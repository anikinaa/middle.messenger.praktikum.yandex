export enum messageType {
    file= 'file',
    message= 'message'
}

export type IMessageSend = {
    id: string
    time: string
    user_id: string
    content: string
    type: string
}

export type IMessageFile = {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: string
    upload_date: string
}

export type IMessage = {
    id: string
    chat_id: number,
    time: string,
    type: messageType,
    user_id: number
    content: string
    file?: IMessageFile
}
