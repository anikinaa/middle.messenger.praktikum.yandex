import { Block, Template } from '../../modules'
import { Input } from '../Input'
import { IInputForm, IInputFormMainProps, IInputFormProps } from './types'
import _template from './template.tpl'
import { joinClassName } from '../../utils/elementAttr'

const template = new Template<IInputFormProps>(_template)

export class InputForm extends Block<IInputFormProps> {
    constructor({
        props, attributes, attributesInput, events,
    }: IInputForm) {
        const { label, requirements, value } = props
        super({
            props: {
                input: new Input({
                    props: {
                        value,
                    },
                    attributes: attributesInput,
                }),
                label,
                requirements,
            },
            events,
            template,
            attributes: {
                class: joinClassName(attributes, 'input-form'),
            },
        })
    }

    setProps({ value, ...props }: Partial<IInputFormMainProps>) {
        super.setProps(props)
        this.props.input.setProps({ value })
    }
}
