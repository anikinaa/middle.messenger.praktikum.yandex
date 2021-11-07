import {Block, Router, Template} from '../../modules'
import {Card} from '../../components'
import { ISettingsPageProps } from './type'
import _template from './template.tpl'
import {SettingForm} from "./blocks/Form";
import {SettingAvatar} from "./blocks/Avatar";

const template = new Template(_template)

export class SettingsPage extends Block<ISettingsPageProps> {
    static pathname: string = '/settings'
    static title: string = 'Настройка пользователя'
    static privatePage: boolean = true

    constructor() {
        super({
            props: {
                card: new Card({
                    props: {
                        header: 'Редактировать профиль',
                        body: [
                            new SettingAvatar({
                                value: ''
                            }),
                            new SettingForm()
                        ],
                    },
                }),
            },
            template,
        })
    }

    static open() {
        Router.go(SettingsPage.pathname)
    }
}
