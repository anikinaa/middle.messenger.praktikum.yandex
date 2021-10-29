import { Block, Template } from '../../modules'
import { Form, ImageUpload } from '../../blocks'
import { consoleFormData } from '../../utils/getFormData'
import { REGEXP } from '../../utils/REGEXP'
import {
    Card, InputForm, Button, Link,
} from '../../components'
import { IProfilePage } from './type'
import _template from './template.tpl'

const template = new Template(_template)

const fields = [
    new ImageUpload({
        name: 'avatar',
        value: '/static/images/avatar.jpg',
    }),
    new InputForm({
        label: 'Почта',
        attributes: {
            required: '',
            type: 'email',
            name: 'email',
            pattern: REGEXP.EMAIL.PATTERN,
            value: 'my_email@ya.ru',
        },
        requirements: REGEXP.EMAIL.TEXT,
    }),
    new InputForm({
        label: 'Логин',
        attributes: {
            required: '',
            type: 'text',
            name: 'login',
            pattern: REGEXP.LOGIN.PATTERN,
            value: 'login',
        },
        requirements: REGEXP.LOGIN.TEXT,
    }),
    new InputForm({
        label: 'Имя',
        attributes: {
            required: '',
            type: 'text',
            name: 'first_name',
            pattern: REGEXP.NAME.PATTERN,
            value: 'Andrey',
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
            value: 'Anikin',
        },
        requirements: REGEXP.NAME.TEXT,
    }),
    new InputForm({
        label: 'Имя в чате',
        attributes: {
            type: 'text',
            name: 'display_name',
            value: 'A Anikin',
        },
    }),
    new InputForm({
        label: 'Телефон',
        attributes: {
            required: '',
            type: 'text',
            name: 'phone',
            pattern: REGEXP.PHONE.PATTERN,
            value: '+79037128326',
        },
        requirements: REGEXP.PHONE.TEXT,
    }),
]

const submit = new Button({
    props: {
        name: 'Сохранить',
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
                text: 'Сменить пароль',
                href: 'reset-password.html',
                attributes: {
                    class: 'link__block',
                },
            }),
            new Link({
                text: 'Выйти',
                href: 'login.html',
                attributes: {
                    class: 'link__block link__danger',
                },
            }),
        ],
    },
    events: {
        submit: consoleFormData,
    },
})

export class ProfilePage extends Block<IProfilePage> {
    constructor() {
        super({
            props: {
                card: new Card({
                    props: {
                        header: 'Андрей А',
                        body: [form],
                    },
                }),
            },
            template,
        })
    }
}
