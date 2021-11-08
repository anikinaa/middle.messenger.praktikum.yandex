import { Template, Router, Block } from '../../modules'
import {Card} from '../../components'
import { ISignUpPageProps } from './type'
import _template from './template.tpl'
import {SignUpForm} from "./blocks/Form";

const template = new Template(_template)

export class SignUpPage extends Block<ISignUpPageProps> {
    static exact: boolean = true
    static pathname: string = '/sign-up'
    static title: string = 'Регистрация'
    static privatePage: boolean = false

    constructor() {
        super({
            props: {
                card: new Card({
                    props: {
                        header: 'Регистрация',
                        body: [new SignUpForm()],
                    },
                }),
            },
            template,
        })
    }

    static open() {
        Router.__instance?.go(SignUpPage.pathname)
    }
}
