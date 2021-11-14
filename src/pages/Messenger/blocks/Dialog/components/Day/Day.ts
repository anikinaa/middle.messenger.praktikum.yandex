import {Block} from "../../../../../../modules";
import {DialogMsgBlock} from "../MsgBlock";
import {IDialogDay, IDialogDayProps} from "./types";

export class DialogDay extends Block<IDialogDayProps>{
    constructor({props: {date, messages}}: IDialogDay) {
        super({
            props: {
                date,
                messages: messages.map(msg => new DialogMsgBlock(msg))
            }
        });
    }
}
