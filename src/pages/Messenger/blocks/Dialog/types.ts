import { DialogMsgBlock } from './components/MsgBlock'
import {MessageForm} from "../MessageForm";

export interface IDialogProps {
    date: string;
    dialog: DialogMsgBlock[];
    messageForm: MessageForm;
}
