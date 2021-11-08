import { Block, Template } from '../../modules'
import { Input } from '../Input'
import { IInputForm, IInputFormProps } from './types'
import _template from './template.tpl'
import { joinClassName } from '../../utils/elementAttr'

const template = new Template<IInputFormProps>(_template)

export class InputForm extends Block<IInputFormProps> {
    constructor({ value, label, attributes, requirements }: IInputForm) {
        super({
            props: {
                input: new Input({
                    value: value ? value : '',
                    attributes: {
                        ...attributes,
                        placeholder: ' ',
                    },
                }),
                label,
                requirements,
            },
            template,
            attributes: {
                class: joinClassName(attributes, 'input-form'),
            },
        })
    }

    setValue(value: string) {
        this.props.input.setValue(value ? value : '')
    }
}
