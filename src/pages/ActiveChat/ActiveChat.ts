import { Block, Template } from '../../modules'
import {
    AppBar, SideBar, Dialog, MessageForm,
} from '../../blocks'
import { ButtonCircle } from '../../components'
import { AppBarHeader } from '../../blocks/AppBar/components/Header'
import { IActiveChatPage } from './types'
import _template from './template.tpl'
import iconDots from '../../assets/icons/dots.svg'
import { DialogMsgBlock } from '../../blocks/Dialog/components/MsgBlock'

const template = new Template<IActiveChatPage>(_template)

const abbBar = new AppBar({
    header: new AppBarHeader(),
    action: new ButtonCircle({
        attributes: {
            class: 'button-circle__gray',
        },
        icon: iconDots,
    }),
})

export class ActiveChatPage extends Block<IActiveChatPage> {
    constructor() {
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

        super({
            props: {
                abbBar,
                sideBar: new SideBar(),
                dialog: [
                    new Dialog({
                        date: 'Сегодня',
                        messages: dataMessages.map((props) => new DialogMsgBlock(props)),
                    }),
                ],
                messageForm: new MessageForm(),
            },
            template,
        })
    }
}
