import {Modal} from "../../../../blocks/Modal";
import {MessengerPage} from "../../Messenger";
import { Router } from "../../../../modules";
import { ChatSettingUserList } from './components/UserList'
import { Button } from '../../../../components'
import { MessengerChatAddUser } from './components/AddUser'
import { ChatUsersController } from '../../../../controllers/chatUsers'

export class MessengerChatSetting extends Modal {
    static exact: boolean = false
    static pathname: string = '/messenger/chat-setting'
    // static redirect: string = '/messenger'
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
                            name: 'Добавить пользователя'
                        },
                        attributes: {
                            class: 'button__primary'
                        },
                        events: {
                            click: MessengerChatAddUser.open
                        }
                    })
                ]
            },
            attributes: {
                class: 'center'
            },
            onClose: MessengerPage.open
        })

        this.controller = new ChatUsersController()
    }

    static open () {
        Router.go(MessengerChatSetting.pathname)
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.controller.resetUser()
    }
}
