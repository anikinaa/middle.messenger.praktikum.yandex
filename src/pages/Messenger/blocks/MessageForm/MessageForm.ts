import { Block, Template } from '@modules'
import { getFormData } from '@utils/getFormData'
import { Input, ButtonCircle } from '@components'
import { REGEXP } from '@utils/REGEXP'
import { MessageController } from '@controllers/message'
import { IMessageFormProps } from './types'
import _template from './template.tpl'
import * as iconSend from '../../../../assets/icons/send.svg'

const template = new Template<IMessageFormProps>(_template)

export class MessageForm extends Block<IMessageFormProps> {
    controller: MessageController

    constructor(controller: MessageController) {
        const message = new Input({
            attributes: {
                required: '',
                placeholder: 'Сообщение...',
                name: 'message',
                pattern: REGEXP.MESSAGE,
            },
        })

        const submit = new ButtonCircle({
            props: {
                icon: iconSend,
            },
            attributes: {
                type: 'submit',
                class: 'button-circle__primary message-form_send',
            },
        })

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
                submit: (e) => {
                    e.preventDefault()
                    const { message: sendMessage } = getFormData(e)
                    this.controller.sendMessage(sendMessage as string)
                    this.props.message.empty()
                },
            },
        })

        this.controller = controller
    }
}
