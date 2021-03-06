import { Block, Store, Template } from '@modules'
import { MessageController } from '@controllers/message'
import { selectMessages } from '@modules/Store/selectors/messages'
import { Button } from '@components'
import { MessageSocket } from '@api/messageSocket'
import { IDialogProps } from './types'
import _template from './template.tpl'
import { DialogDay } from './components/Day'
import { MessageForm } from '../MessageForm'

const template = new Template<IDialogProps>(_template)

export class Dialog extends Block<IDialogProps> {
    controller: MessageController

    firstLoad: boolean

    constructor() {
        const controller = new MessageController()
        super({
            props: {
                dialogs: [],
                messageForm: new MessageForm(controller),
                btnView: undefined,
            },
            attributes: {
                class: 'dialog',
            },
            template,
        })

        this.controller = controller
        this.firstLoad = true

        this.element?.classList.add('loading')
        this.controller.active()?.then(() => {
            this.element?.classList.remove('loading')
            this.controller.addListener(MessageSocket.EVENTS.getOld, this.scrollToBottom.bind(this))
        })

        Store.addListenerForProps('messages', this.updateMessage.bind(this))
    }

    scrollToBottom() {
        if (!this.firstLoad) {
            const wrap = this.element!.querySelector('.dialog-wrap')!
            wrap.scrollTop = wrap.scrollHeight
        }
        this.firstLoad = false
    }

    updateMessage() {
        this.element?.classList.remove('loading')
        const { messages, allLoad } = selectMessages(Store.getState())
        this.setProps({
            dialogs: messages.map((props) => new DialogDay({ props })),
            btnView: !allLoad ? new Button({
                props: {
                    name: 'Смотреть еще...',
                },
                attributes: {
                    class: 'button__secondary button__small',
                },
                events: {
                    click: () => {
                        this.controller.loadMore()
                    },
                },
            }) : undefined,
        })
    }

    componentWillUnmount() {
        this.controller.closeSocket()
        this.controller.removeListener(MessageSocket.EVENTS.getOld, this.scrollToBottom.bind(this))
        Store.removeListenerForProps('messages', this.updateMessage.bind(this))
        Store.setState({
            messages: {
                data: [],
                allLoad: false,
            },
            usersChat: {
                data: [],
                allLoad: false,
            },
        })
    }
}
