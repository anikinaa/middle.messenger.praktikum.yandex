import { Block, Template } from '../../modules'
import { joinClassName } from '../../utils/elementAttr'
import { IForm, IFormProps } from './types'
import _template from './template.tpl'

const template = new Template<IFormProps>(_template)

export class Form extends Block<IFormProps> {
    constructor(data: IForm) {
        const { attributes, props, events } = data
        super({
            props,
            tagName: 'form',
            template,
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'form'),
            },
            events,
        })
    }
}
