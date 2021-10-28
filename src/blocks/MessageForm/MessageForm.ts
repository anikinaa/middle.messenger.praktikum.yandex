import { Block, Template } from '../../modules'
import { consoleFormData } from '../../utils/getFormData'
import { Input, ButtonCircle } from '../../components'
import { IMessageFormProps } from './types'
import _template from './template.tpl'
import iconSend from '../../assets/icons/send.svg'

const template = new Template<IMessageFormProps>(_template)

const message = new Input({
    attributes: {
        required: '',
        placeholder: 'Сообщение...',
        name: 'message',
        pattern: '^[^~#&*<>\\/\\\\{|}]{1,}$',
    },
})

const submit = new ButtonCircle({
    attributes: {
        type: 'submit',
        class: 'button-circle__primary message-form_send',
    },
    icon: iconSend,
})

export class MessageForm extends Block<IMessageFormProps> {
    constructor() {
        super({
            props: {
                message,
                submit,
            },
            tagName: 'form',
            attributes: {
                class: 'message-form',
            },
            template,
            events: {
                submit: consoleFormData,
            },
        })
    }
}
