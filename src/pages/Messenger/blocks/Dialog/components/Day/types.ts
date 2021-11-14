import {DialogMsgBlock} from "../MsgBlock";
import {IDialogDayData} from "../../../../../../modules/Store/selectors/messages";


export type IDialogDayProps = {
    date: string
    messages: DialogMsgBlock[]
}

export type IDialogDay = {
    props: {
        date: string
        messages: IDialogDayData[]
    }
}
