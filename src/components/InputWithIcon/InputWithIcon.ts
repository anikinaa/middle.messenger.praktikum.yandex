import { Block, Template } from '../../modules'
import { joinClassName } from '../../utils/elementAttr'
import { Input } from '../Input'
import { IInputWithIconProps, IInputWithIcon } from './types'
import _template from './template.tpl'

const template = new Template<IInputWithIconProps>(_template)

export class InputWithIcon extends Block<IInputWithIconProps> {
    constructor(data: IInputWithIcon) {
        const { attributes, icon } = data

        super({
            props: {
                input: new Input({
                    attributes: {
                        ...attributes,
                        class: joinClassName(attributes, 'input__with-icon'),
                    },
                }),
                icon,
            },
            template,
            attributes: {
                class: 'input-with-icon',
            },
        })
    }
}
