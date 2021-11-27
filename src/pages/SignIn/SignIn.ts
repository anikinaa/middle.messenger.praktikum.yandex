import { pathRoutes } from '@modules'
import { Card } from '@components'
import { SignInForm } from './blocks/Form'

export class SignInPage extends Card {
    static exact: boolean = true

    static pathname: string = pathRoutes.signIn

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
