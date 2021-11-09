import {Router} from '../../modules'
import {SettingForm} from "./blocks/Form";
import {SettingAvatar} from "./blocks/Avatar";
import {Modal} from "../../blocks/Modal";
import {MessengerPage} from "../Messenger";

export class SettingsPage extends Modal {
    static exact: boolean = false
    static pathname: string = '/messenger/settings'
    static title: string = 'Настройка пользователя'
    static privatePage: boolean = true

    constructor() {
        super({
            props: {
                header: 'Редактировать профиль',
                body: [
                    new SettingAvatar(),
                    new SettingForm()
                ]
            },
            onClose: MessengerPage.open
        })
    }

    static open() {
        Router.go(SettingsPage.pathname)
    }
}
