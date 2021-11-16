import { Block, Template } from '../../modules'
import { joinClassName } from '../../utils/elementAttr'
import { ILink, ILinkMainProps, ILinkProps } from './types'
import _template from './template.tpl'

const template = new Template<ILinkProps>(_template)

export class Link extends Block<ILinkProps> {
    constructor({ props, attributes, events }: ILink) {
        const { text, href } = props

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

    setProps({ href, ...props }: Partial<ILinkMainProps>) {
        super.setProps(props)
        if (href) {
            this.element?.setAttribute('href', href)
        }
    }
}
