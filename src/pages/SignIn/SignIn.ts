import { Template, Block, Router } from '../../modules'
import { Card} from '../../components'
import { ISignInPageProps } from './type'
import _template from './template.tpl'
import {SignInForm} from "./blocks";

const template = new Template(_template)

export class SignInPage extends Block<ISignInPageProps> {
    static exact: boolean = true
    static pathname: string = '/'
    static title: string = 'Авторизация'
    static privatePage: boolean = false

    constructor() {
        super({
            props: {
                card: new Card({
                    props: {
                        header: 'Авторизация',
                        body: [new SignInForm()],
                    },
                }),
            },
            template,
        })
    }

    static open() {
        Router.go(SignInPage.pathname)
    }
}
