import { Router } from '../../modules/Router'
import { Card } from '../../components/Card'
import { SignInForm } from './blocks/Form'

export class SignInPage extends Card {
    static exact: boolean = true

    static pathname: string = '/'

    static title: string = 'Авторизация'

    static privatePage: boolean = false

    constructor() {
        super({
            props: {
                header: 'Авторизация',
                body: new SignInForm(),
            },
        })
    }

    static open() {
        Router.go(SignInPage.pathname)
    }
}
