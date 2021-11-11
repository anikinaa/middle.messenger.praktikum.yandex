import { Modal } from '../../../../../../blocks/Modal'
import { MessengerChatSetting } from '../../ChatSetting'
import { Router } from '../../../../../../modules'
import { Button, InputForm } from '../../../../../../components'
import { ChatUsersController } from '../../../../../../controllers/chatUsers'


export class MessengerChatAddUser extends Modal {
    static exact: boolean = false
    static pathname: string = '/messenger/chat-setting/add-user'
    // static redirect: string = '/messenger'
    static title: string = 'Добавить пользователя в чат'
    static privatePage: boolean = true

    controller: ChatUsersController

    constructor() {
        super({
            props: {
                header: 'Добавить пользователя',
                body: [
                    new InputForm({
                        props: {
                            label: "Логин прользователя"
                        },
                        attributes: {
                            class: 'left'
                        },
                        events: {
                            input: async (e) => {
                                const login = (e.target as HTMLInputElement).value
                                await this.controller.search(login)
                            }
                        }
                    }),
                    new Button({
                        props: {
                            name: 'Добавить'
                        },
                        attributes: {
                            class: 'button__primary'
                        }
                    })
                ]
            },
            attributes: {
                class: 'center'
            },
            onClose: MessengerChatSetting.open
        })

        this.controller = new ChatUsersController()
    }

    static open () {
        Router.go(MessengerChatAddUser.pathname)
    }

}