import { IDayMessages } from '@modules/Store/selectors/messages'
import { DialogMsgBlock } from '../MsgBlock'

export type IDialogDayProps = {
    date: string
    messages: DialogMsgBlock[]
}

export type IDialogDay = {
    props: IDayMessages
}
