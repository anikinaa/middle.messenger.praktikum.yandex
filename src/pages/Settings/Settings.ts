import { Router } from '../../modules'
import { SettingForm } from './blocks/Form'
import { SettingAvatar } from './blocks/Avatar'
import { Card } from '../../components'

export class SettingsPage extends Card {
    static exact: boolean = false

    static pathname: string = '/settings'

    static title: string = 'Настройка пользователя'

    static privatePage: boolean = true

    constructor() {
        super({
            props: {
                header: 'Редактировать профиль',
                body: [
                    new SettingAvatar(),
                    new SettingForm(),
                ],
            },
        })
    }

    static open() {
        Router.go(SettingsPage.pathname)
    }
}
