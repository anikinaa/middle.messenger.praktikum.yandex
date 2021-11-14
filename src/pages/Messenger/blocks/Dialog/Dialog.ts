import {Block, Store, Template} from '../../../../modules'
import { IDialogProps } from './types'
import _template from './template.tpl'
import {MessageController} from "../../../../controllers/message";
import {DialogDay} from "./components/Day";
import {selectMessages} from "../../../../modules/Store/selectors/messages";

const template = new Template<IDialogProps>(_template)

export class Dialog extends Block<IDialogProps> {
    controller: MessageController

    constructor() {
        const controller = new MessageController()
        super({
            props: {
                dialogs: [],
            },
            attributes: {
                class: 'dialog-wrap',
            },
            template,
        })

        this.controller = controller

        this.controller.active()?.then()

        Store.addListenerForProps('messages', this.updateMessage.bind(this))
    }

    updateMessage() {
        const messages = selectMessages(Store.getState())
        console.log(messages)
        this.setProps({
            dialogs: messages.map(props => new DialogDay({props}))
        })
    }

    componentWillUnmount() {
        this.controller.closeSocket()
        Store.removeListenerForProps('messages', this.updateMessage.bind(this))
        Store.setState({
            messages: []
        })
    }
}
