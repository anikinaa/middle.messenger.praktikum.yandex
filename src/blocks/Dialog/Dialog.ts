import { Block, Template } from '../../modules'
import { IDialogProps } from './types'
import _template from './template.tpl'

const template = new Template<IDialogProps>(_template)

export class Dialog extends Block<IDialogProps> {
    constructor({ date, messages }: IDialogProps) {
        super({
            props: {
                date,
                messages,
            },
            attributes: {
                class: 'dialog',
            },
            template,
        })
    }
}
