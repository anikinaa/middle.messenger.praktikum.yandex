import { Block, Template } from '../../modules'
import { consoleFormData } from '../../utils/getFormData'
import { Form } from '../../blocks'
import {
    Card, InputForm, Button, Link,
} from '../../components'
import { ILoginPage } from './type'
import _template from './template.tpl'

const template = new Template(_template)

const fields = [
    new InputForm({
        label: 'Логин',
        attributes: {
            required: '',
            type: 'text',
            name: 'login',
        },
    }),
    new InputForm({
        label: 'Пароль',
        attributes: {
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
    },
    attributes: {
        type: 'submit',
        class: 'button__primary',
    },
})

const form = new Form({
    props: {
        fields,
        submit,
        error: 'error text!!!',
        action: [
            new Link({
                href: 'registration.html',
                text: 'Зарегистрироваться',
            }),
        ],
    },
    events: {
        submit: consoleFormData,
    },
})

export class LoginPage extends Block<ILoginPage> {
    constructor() {
        super({
            props: {
                card: new Card({
                    props: {
                        header: 'Авторизация',
                        body: [form],
                    },
                }),
            },
            template,
        })
    }
}
