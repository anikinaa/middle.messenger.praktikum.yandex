import { Block, Template } from '../../modules'
import { consoleFormData } from '../../utils/getFormData'
import { Form } from '../../blocks'
import {
    Card, InputForm, Button, Link,
} from '../../components'
import _template from './template.tpl'
import { REGEXP } from '../../utils/REGEXP'
import { IResetPasswordPage } from './type'

const template = new Template(_template)

const fields = [
    new InputForm({
        label: 'Текущий пароль',
        attributes: {
            required: '',
            type: 'password',
            name: 'oldPassword',
            autocomplete: 'on',
            class: 'input__with-label',
        },
    }),
    new InputForm({
        label: 'Новый пароль',
        attributes: {
            required: '',
            type: 'password',
            name: 'password',
            pattern: REGEXP.EMAIL,
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
            pattern: REGEXP.EMAIL,
            class: 'input__with-label',
            autocomplete: 'on',
        },
    }),
]

const submit = new Button({
    props: {
        name: 'Применить',
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
                href: 'profile.html',
                text: 'Отменить',
            }),
        ],
    },
    events: {
        submit: consoleFormData,
    },
})

export class ResetPasswordPage extends Block<IResetPasswordPage> {
    constructor() {
        super({
            props: {
                card: new Card({
                    props: {
                        header: 'Смена пароля',
                        body: [form],
                    },
                }),
            },
            template,
        })
    }
}
