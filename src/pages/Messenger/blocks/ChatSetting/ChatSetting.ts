import {Modal} from "../../../../blocks/Modal";
import {MessengerPage} from "../../Messenger";
import {Router} from "../../../../modules";

export class MessengerChatSetting extends Modal {
    static exact: boolean = false
    static pathname: string = '/messenger/chat-setting'
    static title: string = 'Пользователи чата'
    static privatePage: boolean = true

    constructor() {
        super({
            props: {
                header: 'Пользователи чата',
                body: [

                ]
            },
            onClose: MessengerPage.open
        })
    }

    static open () {
        Router.go(MessengerChatSetting.pathname)
    }
}
