import { Block, Template } from '../../modules'
import { joinClassName } from '../../utils/elementAttr'
import { ICardProps, ICard } from './types'
import _template from './template.tpl'

const template = new Template(_template)

export class Card<T> extends Block<ICardProps<T>> {
    constructor(data: ICard<T>) {
        const {
            tagName, props, attributes, events,
        } = data

        super({
            props,
            tagName,
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'card'),
            },
            events,
            template,
        })
    }
}
