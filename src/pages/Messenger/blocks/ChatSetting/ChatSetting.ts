import { Router, pathRoutes } from '@modules'
import { Modal } from '@blocks'
import { Link, Button } from '@components'
import { ChatUsersController } from '@controllers/chatUsers'
import { ChatSettingUserList } from './components/UserList'

export class MessengerChatSetting extends Modal {
    static exact: boolean = false

    static pathname: string = pathRoutes.messengerChatSetting

    static redirect: string = pathRoutes.messenger

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
                            click: () => {
                                Router.go(pathRoutes.messengerChatAddUser)
                            },
                        },
                    }),
                    new Link({
                        props: {
                            text: 'Назад',
                            href: pathRoutes.messenger,
                        },
                        attributes: {
                            class: 'link__block-top',
                        },
                        events: {
                            click: (e) => {
                                e.preventDefault()
                                Router.go(pathRoutes.messenger)
                            },
                        },
                    }),
                ],
            },
            attributes: {
                class: 'center',
            },
            onClose: () => {
                Router.go(pathRoutes.messenger)
            },
        })

        this.controller = new ChatUsersController()
    }

    componentWillUnmount() {
        this.controller.resetUser()
    }
}
