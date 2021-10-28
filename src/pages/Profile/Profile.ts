import { Block, Template } from '../../modules'
import { consoleFormData } from '../../utils/getFormData'
import { Form, ImageUpload } from '../../blocks'
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
            pattern: '^[a-z0-9_\\-\\.]+@[a-z0-9_\\-]{2,}\\.[a-z0-9_\\-]{2,}$',
            class: 'input__with-label',
            value: 'my_email@ya.ru',
        },
    }),
    new InputForm({
        label: 'Логин',
        attributes: {
            required: '',
            type: 'text',
            name: 'login',
            pattern: '^[a-z]{1}[a-z0-9_-]{2,19}$',
            class: 'input__with-label',
            value: 'login',
        },
    }),
    new InputForm({
        label: 'Имя',
        attributes: {
            required: '',
            type: 'text',
            name: 'first_name',
            pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-] * $',
            class: 'input__with-label',
            value: 'Andrey',
        },
    }),
    new InputForm({
        label: 'Фамилия',
        attributes: {
            required: '',
            type: 'text',
            name: 'second_name',
            pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-] * $',
            class: 'input__with-label',
            value: 'Anikin',
        },
    }),
    new InputForm({
        label: 'Имя в чате',
        attributes: {
            required: '',
            type: 'text',
            name: 'display_name',
            pattern: '^[A-Za-zА-Яа-я0-9\\s\\-] * $',
            class: 'input__with-label',
            value: 'A Anikin',
        },
    }),
    new InputForm({
        label: 'Телефон',
        attributes: {
            required: '',
            type: 'text',
            name: 'phone',
            pattern: '^(\\+?\\d){10,15}$',
            class: 'input__with-label',
            value: '+79037128326',
        },
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
