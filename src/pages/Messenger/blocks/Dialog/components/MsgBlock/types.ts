import { Avatar } from '@components'
import { DialogMsgItem } from '../MsgItem'

type message = {
    text: string
    time: string
};

export type IDialogMsgBlock = {
    user: {
        author: string
        src: string
        isMy: boolean
    }
    messages: message[]
};

export type IDialogMsgBlockProps = {
    messages: DialogMsgItem[]
    avatar: Avatar
};
