import { Block } from '../../modules'
import { joinClassName, getDefaultType } from '../../utils/elementAttr'
import { IInput } from './types'

export class Input extends Block {
    constructor({ value, attributes }: IInput) {
        super({
            tagName: 'input',
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'input'),
                type: getDefaultType(attributes, 'text'),
            },
            events: {
                input: (e) => {
                    this.validateValue(e)
                },
                focus: (e) => {
                    if (this.valid) {
                        this.validateValue(e)
                    }
                },
                blur: () => {
                    this._validate()
                },
            },
        })

        this.setValue(value)
    }

    validateValue(e: Event) {
        const { value } = e.target as HTMLInputElement
        if (value && value.length) {
            this._validate()
        } else {
            this.toggleClass('input__invalid', false)
        }
    }

    setValue(value?: string | null) {
        if (value) {
            this.element.setAttribute('value',value)
        }
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
