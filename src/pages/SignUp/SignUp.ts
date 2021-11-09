import { Router } from '../../modules'
import {Card} from '../../components'
import {SignUpForm} from "./blocks/Form";

export class SignUpPage extends Card<SignUpForm> {
    static exact: boolean = true
    static pathname: string = '/sign-up'
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

    static open() {
        Router.__instance?.go(SignUpPage.pathname)
    }
}
