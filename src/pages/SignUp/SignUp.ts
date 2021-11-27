import {routes} from "@modules";
import { SignUpForm } from './blocks/Form'
import { Card } from '@components'

export class SignUpPage extends Card {
    static exact: boolean = true

    static pathname: string = routes.signUp

    static title: string = 'Регистрация'

    static privatePage: boolean = false

    constructor() {
        super({
            props: {
                header: 'Регистрация',
                body: new SignUpForm(),
            },
        })
    }
}
