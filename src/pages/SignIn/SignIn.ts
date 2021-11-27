import {routes} from "@modules";
import { SignInForm } from './blocks/Form'
import { Card } from '@components'

export class SignInPage extends Card {
    static exact: boolean = true

    static pathname: string = routes.signIn

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
}
