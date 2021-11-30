import { pathRoutes } from '@modules'
import { Card } from '@components'
import { SignUpForm } from './blocks/Form'

export class SignUpPage extends Card {
    static exact: boolean = true

    static pathname: string = pathRoutes.signUp

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
