import { Router, routes } from '@modules'
import { Modal } from '@blocks'
import { Link, Button } from '@components'
import { ChatUsersController } from '@controllers/chatUsers'
import {ChatSettingUserList} from "./components/UserList";

export class MessengerChatSetting extends Modal {
    static exact: boolean = false

    static pathname: string = routes.messengerChatSetting

    static redirect: string = routes.messenger

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
                                Router.go(routes.messengerChatAddUser)
                            }
                        },
                    }),
                    new Link({
                        props: {
                            text: 'Назад',
                            href: routes.messenger,
                        },
                        attributes: {
                            class: 'link__block-top',
                        },
                        events: {
                            click: (e) => {
                                e.preventDefault()
                                Router.go(routes.messenger)
                            },
                        },
                    }),
                ],
            },
            attributes: {
                class: 'center',
            },
            onClose: () => {
                Router.go(routes.messenger)
            },
        })

        this.controller = new ChatUsersController()
    }


    componentWillUnmount() {
        this.controller.resetUser()
    }
}
