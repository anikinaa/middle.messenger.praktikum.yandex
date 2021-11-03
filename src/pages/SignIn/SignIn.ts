import { Template, Page, singleton, Block, Router } from '../../modules'
import { consoleFormData } from '../../utils/getFormData'
import { Form } from '../../blocks'
import {
    Card, InputForm, Button, Link,
} from '../../components'
import { ISignInPageProps } from './type'
import _template from './template.tpl'
import { SignUpPage } from '../SignUp'
// import { REGEXP } from '../../utils/REGEXP'

const template = new Template(_template)

const fields = [
    new InputForm({
        label: 'Логин',
        attributes: {
            required: '',
            type: 'text',
            name: 'login',
            // pattern: REGEXP.SANITIZER.PATTERN
        },
        // requirements: REGEXP.SANITIZER.TEXT
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
    }
})

export class SignInPage extends Block<ISignInPageProps> {
    static url: string = '/'
    static title: string = 'Авторизация'

    constructor() {

        const form = new Form({
            props: {
                fields,
                submit,
                error: 'error text!!!',
                action: [
                    new Link({
                        href: SignUpPage.url,
                        text: 'Зарегистрироваться',
                        events: {
                            click: (e) => {
                                SignUpPage.open()
                                e.preventDefault()
                            }
                        }
                    }),
                ],
            },
            events: {
                submit: (e) => {
                    consoleFormData(e)
                },
            },
        })

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

    // @ts-ignore
    protected componentDidMount(oldProps: {} | ISignInPageProps) {
        document.body.classList.add('body__dark')
    }

    static open() {
        Router.__instance?.go(SignInPage.url)
    }
}
