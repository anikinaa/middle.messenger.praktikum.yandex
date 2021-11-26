import { Block } from '../../modules/Block'
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
                value: props?.value || '',
            },
            events: {
                ...events,
                input: (e) => {
                    this._sanitize(e)
                    if (this.element.classList.contains('input__invalid')) {
                        this.validateValue(e)
                    }
                    if (events?.input) {
                        events?.input(e)
                    }
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

    private _sanitize(e: Event) {
        const { value } = e.target as HTMLInputElement
        const map: Record<string, string> = {
            '&': '',
            '<': '«',
            '>': '»',
            '/': '',
        }
        const reg = /[&<>/]/ig
        this.element.value = value.replace(reg, (match) => (map[match]))
    }

    setProps({ value, ...props }: Partial<IInputProps>) {
        super.setProps(props)
        this.element.setAttribute('value', value || '')
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

    empty() {
        this.element.blur()
        this.element.value = ''
        this.element.classList.remove('input__invalid')
    }

    get element() {
        return this._element as HTMLInputElement
    }
}
