import { Button } from '@components'
import { MessageForm } from '../MessageForm'
import { EmptyText } from '../EmptyText'
import { DialogDay } from './components/Day'

export type IDialogProps = {
    dialogs: DialogDay[] | EmptyText
    messageForm: MessageForm
    btnView?: Button
}
