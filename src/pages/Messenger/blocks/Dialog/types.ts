import {DialogDay} from "./components/Day";
import { MessageForm } from '../MessageForm'
import { Button } from '../../../../components'
import { EmptyText } from '../EmptyText'

export type IDialogProps = {
    dialogs: DialogDay[] | EmptyText
    messageForm: MessageForm
    btnView?: Button
}
