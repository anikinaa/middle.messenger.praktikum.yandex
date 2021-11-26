import { Router } from '../../../../modules/Router'
import { IAsyncStoreState } from '../../../../modules/AsyncStore'
import { Form } from '../../../../blocks/Form'
import { Modal } from '../../../../blocks/Modal'
import { Button } from '../../../../components/Button'
import { InputForm } from '../../../../components/InputForm'
import { Link } from '../../../../components/Link'
import { REGEXP } from '../../../../utils/REGEXP'
import { UserPasswordController } from '../../../../controllers/userPassword'
import { UserController } from '../../../../controllers/user'
import { getFormData } from '../../../../utils/getFormData'
import { IUserPasswordForm } from '../../../../models/user'

export class SettingPassword extends Modal {
    static exact: boolean = false

    static pathname: string = '/settings/password'

    static title: string = 'Смена пароля'

    static privatePage: boolean = true

    controller: UserPasswordController

    constructor() {
        const submit = new Button({
            props: {
                name: 'Применить',
            },
            attributes: {
                type: 'submit',
                class: 'button__primary',
            },
        })

        const fields = [
            new InputForm({
                props: {
                    label: 'Текщий пароль',
                },
                attributes: {
                    required: '',
                    type: 'password',
                    name: 'oldPassword',
                    autocomplete: 'on',
                },
            }),
            new InputForm({
                props: {
                    label: 'Новый пароль',
                    requirements: REGEXP.PASSWORD.TEXT,
                },
                attributes: {
                    required: '',
                    type: 'password',
                    name: 'newPassword',
                    pattern: REGEXP.PASSWORD.PATTERN,
                    autocomplete: 'on',
                },
            }),
            new InputForm({
                props: {
                    label: 'Повторите новый пароль',
                    requirements: REGEXP.PASSWORD.TEXT,
                },
                attributes: {
                    required: '',
                    type: 'password',
                    name: 'repeat_newPassword',
                    pattern: REGEXP.PASSWORD.PATTERN,
                    autocomplete: 'on',
                },
            }),

        ]

        const cancel = new Link({
            props: {
                text: 'Отменить',
                href: '/settings',
            },
            attributes: {
                class: 'link__block',
            },
            events: {
                click: (e) => {
                    e.preventDefault()
                    Router.go('/settings')
                },
            },
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
                    const data = getFormData(e) as unknown as IUserPasswordForm
                    this.controller?.changePassword(data)
                    e.preventDefault()
                },
            },
        })

        super({
            props: {
                header: 'Смена пароля',
                body: form,
            },
            onClose: () => {
                Router.go('/settings')
            }
        })

        this.controller = new UserPasswordController()

        this.controller.eventBus!.on(UserController.EVENT, this.updateLocalStore.bind(this))
    }

    updateLocalStore({ isLoading, error }: IAsyncStoreState) {
        const form = this.props.card.props.body as Form
        form.setProps({ error })
        form.props.submit.setProps({ isLoading })
    }

    protected componentWillUnmount() {
        this.controller.eventBus!.off(UserController.EVENT, this.updateLocalStore.bind(this))
    }

    static open() {
        Router.go(SettingPassword.pathname)
    }
}
