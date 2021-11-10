import { Modal } from '../../../../../../blocks/Modal'
import { MessengerChatSetting } from '../../ChatSetting'
import { Router } from '../../../../../../modules'
import { Button, InputForm } from '../../../../../../components'


export class MessengerChatAddUser extends Modal {
    static exact: boolean = false
    static pathname: string = '/messenger/chat-setting/add-user'
    // static redirect: string = '/messenger'
    static title: string = 'Добавить пользователя в чат'
    static privatePage: boolean = true

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
    }

    static open () {
        Router.go(MessengerChatAddUser.pathname)
    }

}