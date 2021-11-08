import { IAsyncStoreState, Router } from '../../../../modules'
import { Form } from '../../../../blocks'
import { Modal } from '../../../../blocks/Modal'
import { Button, InputForm, Link } from '../../../../components'
import { SettingsPage } from '../../Settings'
import { REGEXP } from '../../../../utils/REGEXP'
import { UserPasswordController } from '../../../../controllers/userPassword'
import { UserController } from '../../../../controllers/user'
import { getFormData } from '../../../../utils/getFormData'
import { IUserPassword } from '../../../../models/user'

export class SettingPassword extends Modal{
    static exact: boolean = false
    static pathname: string = '/settings/password'
    static title: string = 'Смена пароля'
    static privatePage: boolean = true

    controller: UserPasswordController | undefined

    constructor() {
        const submit = new Button({
            props: {
                name: 'Применить'
            },
            attributes: {
                type: 'submit',
                class: 'button__primary'
            }
        })

        const fields = [
            new InputForm({
                label: 'Текщий пароль',
                attributes: {
                    required: '',
                    type: 'password',
                    name: 'oldPassword',
                    autocomplete: 'on',
                },
            }),
            new InputForm({
                label: 'Новый пароль',
                attributes: {
                    required: '',
                    type: 'password',
                    name: 'newPassword',
                    pattern: REGEXP.PASSWORD.PATTERN,
                    autocomplete: 'on',
                },
                requirements: REGEXP.PASSWORD.TEXT,
            }),
            new InputForm({
                label: 'Повторите новый пароль',
                attributes: {
                    required: '',
                    type: 'password',
                    name: 'repeat_newPassword',
                    pattern: REGEXP.PASSWORD.PATTERN,
                    autocomplete: 'on',
                },
                requirements: REGEXP.PASSWORD.TEXT,
            }),

        ]

        const cancel = new Link({
            text: 'Отменить',
            href: SettingsPage.pathname,
            attributes: {
                class: 'link__block',
            },
            events: {
                click: (e) => {
                    e.preventDefault()
                    SettingsPage.open()
                }
            }
        })

        const form = new Form({
            props: {
                fields,
                submit,
                error: null,
                action: [cancel],
            },
            events: {
                submit: (e) => {
                    const data = getFormData(e) as unknown as IUserPassword
                    this.controller?.changePassword(data)
                    e.preventDefault()
                }
            }
        })

        super({
            header: 'Смена пароля',
            body: form
        });

        this.controller = new UserPasswordController()

        this.controller.eventBus!.on(UserController.EVENT, ({isLoading, error}: IAsyncStoreState) => {
            form.setProps({error})
            submit.setProps({isLoading})
        })
    }

    static open() {
        Router.go(SettingPassword.pathname)
    }
}