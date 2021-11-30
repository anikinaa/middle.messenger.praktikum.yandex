import { pathRoutes } from '@modules'
import { Card } from '@components'
import { SettingForm } from './blocks/Form'
import { SettingAvatar } from './blocks/Avatar'

export class SettingsPage extends Card {
    static exact: boolean = false

    static pathname: string = pathRoutes.settings

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
}
