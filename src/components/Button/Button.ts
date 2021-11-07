import { Block, Template } from '../../modules'
import { getDefaultType, joinClassName } from '../../utils/elementAttr'
import { IButton, IButtonProps } from './types'
import _template from './template.tpl'

const template = new Template(_template)

export class Button extends Block<IButtonProps> {
    constructor(data: IButton) {
        const { attributes, events, props } = data
        const {isLoading = false} = props!
        const className = isLoading ? 'button button__loading' : 'button'
        super({
            props,
            tagName: 'button',
            attributes: {
                ...attributes,
                class: joinClassName(attributes, className),
                type: getDefaultType(attributes, 'button'),
            },
            events,
            template,
        })

    }

    // @ts-ignore
    componentDidUpdate(oldProps: IButtonProps, newProps: IButtonProps){
        const {isLoading} = newProps
        this.element?.classList.toggle('button__loading', isLoading)
    }
}
