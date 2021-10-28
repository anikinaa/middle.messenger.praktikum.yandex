import { Block, Template } from '../../modules'
import { DialogMsgBlock } from './components/MsgBlock'
import { IDialog } from './types'
import _template from './template.tpl'

const template = new Template<IDialog>(_template)

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

export class Dialog extends Block<IDialog> {
    constructor() {
        super({
            props: {
                date: 'Сегодня',
                messages: dataMessages.map((props) => new DialogMsgBlock(props)),
            },
            attributes: {
                class: 'dialog',
            },
            template,
        })
    }
}
