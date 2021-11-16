import { DialogMsgBlock } from '../MsgBlock'
import { IDayMessages } from '../../../../../../modules/Store/selectors/messages'

export type IDialogDayProps = {
    date: string
    messages: DialogMsgBlock[]
}

export type IDialogDay = {
    props: IDayMessages
}
