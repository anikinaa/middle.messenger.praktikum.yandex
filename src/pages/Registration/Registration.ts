import { Block, Template } from '../../modules'
import { Form } from '../../blocks'
import {
    Card, InputForm, Button, Link,
} from '../../components'
import { consoleFormData } from '../../utils/getFormData'
import { REGEXP } from '../../utils/REGEXP'
import { IRegistrationPage } from './type'
import _template from './template.tpl'

const template = new Template(_template)

const fields = [
    new InputForm({
        label: 'Почта',
        attributes: {
            required: '',
            type: 'email',
            name: 'email',
            pattern: REGEXP.EMAIL,
            class: 'input__with-label',
        },
    }),
    new InputForm({
        label: 'Имя',
        attributes: {
            required: '',
            type: 'text',
            name: 'first_name',
            pattern: REGEXP.NAME,
            class: 'input__with-label',
        },
    }),
    new InputForm({
        label: 'Фамилия',
        attributes: {
            required: '',
            type: 'text',
            name: 'second_name',
            pattern: REGEXP.NAME,
            class: 'input__with-label',
        },
    }),
    new InputForm({
        label: 'Логин',
        attributes: {
            required: '',
            type: 'text',
            name: 'login',
            pattern: REGEXP.LOGIN,
            class: 'input__with-label',
        },
    }),
    new InputForm({
        label: 'Телефон',
        attributes: {
            required: '',
            type: 'text',
            name: 'phone',
            pattern: REGEXP.PHONE,
            class: 'input__with-label',
        },
    }),
    new InputForm({
        label: 'Пароль',
        attributes: {
            required: '',
            type: 'password',
            name: 'password',
            pattern: REGEXP.PASSWORD,
            class: 'input__with-label',
            autocomplete: 'on',
        },
    }),
    new InputForm({
        label: 'Повторите пароль',
        attributes: {
            required: '',
            type: 'password',
            name: 'repeat_password',
            pattern: REGEXP.PASSWORD,
            class: 'input__with-label',
            autocomplete: 'on',
        },
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

const form = new Form({
    props: {
        fields,
        submit,
        error: 'error text!!!',
        action: [
            new Link({
                text: 'Войти',
                href: 'login.html',
            }),
        ],
    },
    events: {
        submit: consoleFormData,
    },
})

export class RegistrationPage extends Block<IRegistrationPage> {
    constructor() {
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
}
