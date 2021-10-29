import { Block } from '../../modules'
import { joinClassName, getDefaultType } from '../../utils/elementAttr'
import { IInput } from './types'

export class Input extends Block<{}> {
    constructor({ attributes }: IInput) {
        super({
            tagName: 'input',
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'input'),
                type: getDefaultType(attributes, 'text'),
            },
            events: {
                focus: () => {
                    this._validate()
                },
                blur: () => {
                    this._validate()
                },
            },
        })
    }

    get valid() {
        return this.element.validity.valid
    }

    private _validate() {
        this.toggleClass('input__invalid', !this.valid)
    }

    get element() {
        return this._element as HTMLInputElement
    }
}
