import { Block, Template } from '../../../../../../modules'
import { IMsgItemProps } from './types'
import _template from './template.tpl'

const template = new Template<IMsgItemProps>(_template)

export class DialogMsgItem extends Block<IMsgItemProps> {
    constructor(props: IMsgItemProps) {

        super({
            props,
            template,
            attributes: {
                class: 'message',
            },
        })
    }
}
