import { Block, Template } from '../../modules'
import { joinClassName } from '../../utils/elementAttr'
import { Input } from '../Input'
import { IInputForm, IInputFormProps } from './types'
import _template from './template.tpl'

const template = new Template<IInputFormProps>(_template)

export class InputForm extends Block<IInputFormProps> {
    constructor({ label, attributes }: IInputForm) {
        super({
            props: {
                input: new Input({
                    attributes: {
                        ...attributes,
                        class: joinClassName(attributes!, 'input'),
                    },
                }),
                label,
            },
            tagName: 'label',
            template,
            attributes: {
                class: 'input-form',
            },
        })
    }
}
