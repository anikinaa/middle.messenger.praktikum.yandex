import {Block} from "../../../../../../modules";
import {DialogMsgBlock} from "../MsgBlock";
import {IDialogDay, IDialogDayProps} from "./types";

export class DialogDay extends Block<IDialogDayProps>{
    constructor({props: {date, messages}}: IDialogDay) {
        console.log(messages)
        super({
            props: {
                date,
                messages: new DialogMsgBlock(messages)
            }
        });
    }
}
