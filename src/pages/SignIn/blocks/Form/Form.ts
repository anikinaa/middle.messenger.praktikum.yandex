import { IAsyncStoreState, Router, routes } from '@modules'
import { Form } from '@blocks'
import { Button, InputForm, Link } from '@components'
import { getFormData } from '@utils/getFormData'
import { AuthController } from '@controllers/auth'
import { ISignInFormModel } from '@models/signIn'

export class SignInForm extends Form {
    controller: AuthController

    constructor() {
        const controller = new AuthController()
        const { isLoading, error } = controller.getState()

        const fields = [
            new InputForm({
                props: {
                    label: 'Логин',
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'login',
                },
            }),
            new InputForm({
                props: {
                    label: 'Пароль',
                },
                attributesInput: {
                    required: '',
                    type: 'password',
                    name: 'password',
                    autocomplete: 'on',
                },
            }),
        ]

        const submit = new Button({
            props: {
                name: 'Войти',
                isLoading,
            },
            attributes: {
                type: 'submit',
                class: 'button__primary',
            },
        })

        super({
            props: {
                fields,
                submit,
                error,
                action: [
                    new Link({
                        props: {
                            href: routes.signUp,
                            text: 'Зарегистрироваться',
                        },
                        events: {
                            click: (e: Event) => {
                                Router.go(routes.signUp)
                                e.preventDefault()
                            },
                        },
                    }),
                ],
            },
            events: {
                submit: async (e) => {
                    e.preventDefault()
                    const data = getFormData(e) as unknown as ISignInFormModel
                    await this.controller.signIn(data)
                },
            },
        })

        this.controller = controller

        this.controller.eventBus!.on(AuthController.EVENT, this.updateLocalStore.bind(this))
    }

    updateLocalStore({ isLoading, error }: IAsyncStoreState) {
        this.props.submit.setProps({ isLoading })
        this.setProps({ error })
    }

    protected componentWillUnmount() {
        this.controller.eventBus!.off(AuthController.EVENT, this.updateLocalStore.bind(this))
    }
}
