import { Block } from '../../modules/Block'
import { Template } from '../../modules/Template'
import { getDefaultType, joinClassName } from '../../utils/elementAttr'
import { IButton, IButtonProps } from './types'
import _template from './template'
import { classNames } from '../../utils/classnames'

const template = new Template(_template)

export class Button extends Block<IButtonProps> {
    constructor(data: IButton) {
        const { attributes, events, props } = data
        const className = classNames('button', {
            button__loading: props.isLoading,
        })
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

        this.setProps = ({ isLoading, name }) => {
            if (name) {
                super.setProps({ name })
            }
            if (isLoading !== undefined) {
                this.element?.classList.toggle('button__loading', isLoading)
            }
        }
    }
}
