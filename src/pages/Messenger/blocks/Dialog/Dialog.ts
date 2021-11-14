import {Block, Store, Template} from '../../../../modules'
import { IDialogProps } from './types'
import _template from './template.tpl'
import {DialogMsgBlock} from "./components/MsgBlock";
import {MessageController} from "../../../../controllers/message";
import {MessageForm} from "../MessageForm";
import {selectMessages} from "../../../../modules/Store/selectors/messages";

const template = new Template<IDialogProps>(_template)

const dataMessages = [
    {
        user: {
            author: 'author',
            src: '/static/images/avatar.jpg',
            isMy: false,
        },
        messages: [
            {
                text: 'Вопрос',
                time: '14:00',
            },
            {
                text: 'Вопрос 2',
                time: '14:10',
            },
        ],
    },
    {
        user: {
            author: 'author',
            src: '/static/images/avatar.jpg',
            isMy: true,
        },
        messages: [
            {
                time: '15:00',
                text: 'Ответ',
            },
            {
                text: 'Ответ 2',
                time: '15:10',
            },
        ],
    },
]

const messages = dataMessages.map((props) => new DialogMsgBlock(props))

export class Dialog extends Block<IDialogProps> {
    controller: MessageController

    constructor() {
        const controller = new MessageController()
        super({
            props: {
                date: 'sca',
                dialog: messages,
                messageForm: new MessageForm(controller)
            },
            attributes: {
                class: 'dialog-wrap',
            },
            template,
        })

        this.controller = controller

        this.controller.active()?.then()

        Store.addListenerForProps('messages', this.updateMessage)
    }

    updateMessage() {
        const messages = selectMessages(Store.getState())
        console.log(messages)
    }

    componentWillUnmount() {
        this.controller.closeSocket()
        Store.removeListenerForProps('messages', this.updateMessage)
        Store.setState({
            messages: []
        })
    }
}
