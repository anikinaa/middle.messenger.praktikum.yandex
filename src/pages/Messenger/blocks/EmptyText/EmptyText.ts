import { Block } from '../../../../modules/Block'
import { Template } from '../../../../modules/Template'
import _template from './teimplate.tpl'
import { IEmptyText, IEmptyTextProps } from './types'

const template = new Template(_template)

export class EmptyText extends Block<IEmptyTextProps> {
    constructor({ props }: IEmptyText) {
        super({
            props,
            attributes: {
                class: 'no-chat',
            },
            template,
        })
    }
}
