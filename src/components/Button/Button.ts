import { Block, Template } from '../../modules'
import { getDefaultType, joinClassName } from '../../utils/elementAttr'
import { IButton, IButtonProps } from './types'
import _template from './template.tpl'

const template = new Template(_template)

export class Button extends Block<IButtonProps> {
    constructor(data: IButton) {
        const { attributes, events, props } = data

        super({
            props,
            tagName: 'button',
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'button'),
                type: getDefaultType(attributes, 'button'),
            },
            events,
            template,
        })
    }
}
