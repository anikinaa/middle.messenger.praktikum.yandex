import { Modal } from '../../../../blocks/Modal'
import { Router } from '../../../../modules/Router'
import { ChatSettingUserList } from './components/UserList'
import { Button } from '../../../../components/Button'
import { Link } from '../../../../components/Link'
import { MessengerChatAddUser } from './components/AddUser'
import { ChatUsersController } from '../../../../controllers/chatUsers'

export class MessengerChatSetting extends Modal {
    static exact: boolean = false

    static pathname: string = '/messenger/chat-setting'

    static redirect: string = '/messenger'

    static title: string = 'Пользователи чата'

    static privatePage: boolean = true

    controller: ChatUsersController

    constructor() {
        super({
            props: {
                header: 'Пользователи чата',
                body: [
                    new ChatSettingUserList(),
                    new Button({
                        props: {
                            name: 'Добавить пользователя',
                        },
                        attributes: {
                            class: 'button__primary',
                        },
                        events: {
                            click: MessengerChatAddUser.open,
                        },
                    }),
                    new Link({
                        props: {
                            text: 'Назад',
                            href: '/messenger',
                        },
                        attributes: {
                            class: 'link__block-top',
                        },
                        events: {
                            click: (e) => {
                                e.preventDefault()
                                Router.go('/messenger')
                            },
                        },
                    }),
                ],
            },
            attributes: {
                class: 'center',
            },
            onClose: () => {
                Router.go('/messenger')
            },
        })

        this.controller = new ChatUsersController()
    }

    static open() {
        Router.go(MessengerChatSetting.pathname)
    }

    componentWillUnmount() {
        this.controller.resetUser()
    }
}
