import { Block, Template } from '../../modules'
import { joinClassName } from '../../utils/elementAttr'
import { ILink, ILinkProps } from './types'
import _template from './template.tpl'

const template = new Template<ILinkProps>(_template)

export class Link extends Block<ILinkProps> {
    constructor(data: ILink) {
        const {
            attributes, events, text, href,
        } = data

        super({
            props: {
                text,
            },
            tagName: 'a',
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'link'),
                href,
            },
            events,
            template,
        })
    }
}
