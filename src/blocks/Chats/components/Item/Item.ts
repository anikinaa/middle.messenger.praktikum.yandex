import { Block, Template } from '../../../../modules'
import { joinClassName } from '../../../../utils/elementAttr'
import { IChatsItemProps, IChatsItem } from './types'
import _template from './template.tpl'

const template = new Template<IChatsItemProps>(_template)

export class ChatsItem extends Block<IChatsItemProps> {
    constructor(data: IChatsItem) {
        const { props, events, attributes } = data

        super({
            props,
            tagName: 'li',
            template,
            events,
            attributes: {
                ...attributes,
                class: joinClassName(attributes!, 'chat-item'),
            },
        })
    }
}
