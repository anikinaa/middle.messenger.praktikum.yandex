import { Block, Template } from '../../modules'
import { joinClassName } from '../../utils/elementAttr'
import { Input } from '../Input'
import { IInputWithIconProps, IInputWithIcon, IInputWithIconMainProps } from './types'
import _template from './template.tpl'

const template = new Template<IInputWithIconProps>(_template)

export class InputWithIcon extends Block<IInputWithIconProps> {
    constructor({ props: { icon, value }, attributesInput, attributes }: IInputWithIcon) {
        super({
            props: {
                input: new Input({
                    props: {
                        value,
                    },
                    attributes: {
                        ...attributesInput,
                        class: joinClassName(attributesInput, 'input__with-icon'),
                    },
                }),
                icon,
            },
            template,
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'input-with-icon'),
            },
        })
    }

    setProps({ value, ...props }: Partial<IInputWithIconMainProps>) {
        super.setProps(props)
        this.props.input.setProps({ value })
    }
}
