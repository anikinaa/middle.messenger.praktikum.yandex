import { Template, Router, Block } from '../../modules'
import { Form } from '../../blocks'
import {
    Card, InputForm, Button, Link,
} from '../../components'
import { consoleFormData } from '../../utils/getFormData'
import { REGEXP } from '../../utils/REGEXP'
import { ISignUpPageProps } from './type'
import _template from './template.tpl'
import { SignInPage } from '../SignIn'

const template = new Template(_template)

export const RegistrationUrl = '/sign-up'

const fields = [
    new InputForm({
        label: 'Почта',
        attributes: {
            required: '',
            type: 'email',
            name: 'email',
            pattern: REGEXP.EMAIL.PATTERN,
        },
        requirements: REGEXP.EMAIL.TEXT,
    }),
    new InputForm({
        label: 'Имя',
        attributes: {
            required: '',
            type: 'text',
            name: 'first_name',
            pattern: REGEXP.NAME.PATTERN,
        },
        requirements: REGEXP.NAME.TEXT,
    }),
    new InputForm({
        label: 'Фамилия',
        attributes: {
            required: '',
            type: 'text',
            name: 'second_name',
            pattern: REGEXP.NAME.PATTERN,
        },
        requirements: REGEXP.NAME.TEXT,
    }),
    new InputForm({
        label: 'Логин',
        attributes: {
            required: '',
            type: 'text',
            name: 'login',
            pattern: REGEXP.LOGIN.PATTERN,
        },
        requirements: REGEXP.LOGIN.TEXT,
    }),
    new InputForm({
        label: 'Телефон',
        attributes: {
            required: '',
            type: 'text',
            name: 'phone',
            pattern: REGEXP.PHONE.PATTERN,
        },
        requirements: REGEXP.PHONE.TEXT,
    }),
    new InputForm({
        label: 'Пароль',
        attributes: {
            required: '',
            type: 'password',
            name: 'password',
            pattern: REGEXP.PASSWORD.PATTERN,
            autocomplete: 'on',
        },
        requirements: REGEXP.PASSWORD.TEXT,
    }),
    new InputForm({
        label: 'Повторите пароль',
        attributes: {
            required: '',
            type: 'password',
            name: 'repeat_password',
            pattern: REGEXP.PASSWORD.PATTERN,
            autocomplete: 'on',
        },
        requirements: REGEXP.PASSWORD.TEXT,
    }),
]

const submit = new Button({
    props: {
        name: 'Зарегистрироваться',
    },
    attributes: {
        type: 'submit',
        class: 'button__primary',
    },
})

export class SignUpPage extends Block<ISignUpPageProps> {
    static url: string = '/sign-up'
    static title: string = 'Регистрация'

    constructor() {

        const form = new Form({
            props: {
                fields,
                submit,
                error: 'error text!!!',
                action: [
                    new Link({
                        text: 'Войти',
                        href: SignInPage.url,
                        events: {
                            click: (e) => {
                                SignInPage.open()
                                e.preventDefault()
                            }
                        }
                    }),
                ],
            },
            events: {
                submit: consoleFormData,
            },
        })

        super({
            props: {
                card: new Card({
                    props: {
                        header: 'Регистрация',
                        body: [form],
                    },
                }),
            },
            template,
        })
    }

    static open() {
        Router.__instance?.go(SignUpPage.url)
    }

}
