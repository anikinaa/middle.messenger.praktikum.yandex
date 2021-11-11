import { Block } from '../../modules'
import { joinClassName, getDefaultType } from '../../utils/elementAttr'
import { IInput, IInputProps } from './types'

export class Input extends Block<IInputProps> {
    constructor({ props, attributes, events }: IInput) {
        super({
            props,
            tagName: 'input',
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'input'),
                type: getDefaultType(attributes, 'text'),
                value: props?.value || ''
            },
            events: {
                ...events,
                input: (e) => {
                    if (this.element.classList.contains('input__invalid')) {
                        this.validateValue(e)
                    }
                    events?.input && events?.input(e)
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

    }

    setProps({value, ...props}: Partial<IInputProps>) {
        super.setProps(props);
        this.element.setAttribute('value',value || '')
    }

    validateValue(e: Event) {
        const { value } = e.target as HTMLInputElement
        if (value && value.length) {
            this._validate()
        } else {
            this.toggleClass('input__invalid', false)
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
