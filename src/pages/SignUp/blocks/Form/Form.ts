import { IAsyncStoreState, Router, routes } from '@modules'
import { Form } from '@blocks'
import { AuthController } from '@controllers/auth'
import { Button, InputForm, Link } from '@components'
import { REGEXP } from '@utils/REGEXP'
import { getFormData } from '@utils/getFormData'
import { ISignUpFormModel } from '@models/signUp'

export class SignUpForm extends Form {
    controller: AuthController

    constructor() {
        const controller = new AuthController()
        const { isLoading, error } = controller.getState()

        const fields = [
            new InputForm({
                props: {
                    label: 'Почта',
                    requirements: REGEXP.EMAIL.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'email',
                    name: 'email',
                    pattern: REGEXP.EMAIL.PATTERN,
                    class: 'input-form__required',
                },
            }),
            new InputForm({
                props: {
                    label: 'Имя',
                    requirements: REGEXP.NAME.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'first_name',
                    pattern: REGEXP.NAME.PATTERN,
                    class: 'input-form__required',
                },
            }),
            new InputForm({
                props: {
                    label: 'Фамилия',
                    requirements: REGEXP.NAME.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'second_name',
                    pattern: REGEXP.NAME.PATTERN,
                    class: 'input-form__required',
                },
            }),
            new InputForm({
                props: {
                    requirements: REGEXP.LOGIN.TEXT,
                    label: 'Логин',
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'login',
                    pattern: REGEXP.LOGIN.PATTERN,
                    class: 'input-form__required',
                },
            }),
            new InputForm({
                props: {
                    requirements: REGEXP.PHONE.TEXT,
                    label: 'Телефон',
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'phone',
                    pattern: REGEXP.PHONE.PATTERN,
                    class: 'input-form__required',
                },
            }),
            new InputForm({
                props: {
                    label: 'Пароль',
                    requirements: REGEXP.PASSWORD.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'password',
                    name: 'password',
                    pattern: REGEXP.PASSWORD.PATTERN,
                    autocomplete: 'on',
                    class: 'input-form__required',
                },
            }),
            new InputForm({
                props: {
                    label: 'Повторите пароль',
                    requirements: REGEXP.PASSWORD.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'password',
                    name: 'repeat_password',
                    pattern: REGEXP.PASSWORD.PATTERN,
                    autocomplete: 'on',
                    class: 'input-form__required',
                },
            }),
        ]

        const submit = new Button({
            props: {
                name: 'Зарегистрироваться',
                isLoading,
            },
            attributes: {
                type: 'submit',
                class: 'button__primary',
            },
        })

        const signIn = new Link({
            props: {
                text: 'Войти',
                href: routes.signIn,
            },
            events: {
                click: (e) => {
                    Router.go(routes.signIn)
                    e.preventDefault()
                },
            },
        })

        super({
            props: {
                fields,
                submit,
                error,
                action: [signIn],
            },
            events: {
                submit: async (e) => {
                    e.preventDefault()
                    const data = getFormData(e) as unknown as ISignUpFormModel
                    await this.controller.signUp(data)
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
