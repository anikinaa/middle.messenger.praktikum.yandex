import { Block } from '../../../../../../modules/Block'
import { Template } from '../../../../../../modules/Template'
import { DialogMsgBlock } from '../MsgBlock'
import { IDialogDay, IDialogDayProps } from './types'
import _template from './template.tpl'

const template = new Template(_template)

export class DialogDay extends Block<IDialogDayProps> {
    constructor({ props: { date, messages } }: IDialogDay) {
        super({
            props: {
                date,
                messages: messages.map((msg) => new DialogMsgBlock(msg)),
            },
            template,
        })
    }
}
