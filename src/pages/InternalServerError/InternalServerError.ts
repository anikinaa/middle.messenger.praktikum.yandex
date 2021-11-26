import { Router } from '../../modules/Router'
import { ErrorPage } from '../../blocks/ErrorPage'

export class InternalServerErrorPage extends ErrorPage {
    static exact: boolean = true

    static pathname: string = '/500'

    static title: string = 'Мы уже фиксим'

    constructor() {
        super({
            props: {
                code: '5**',
                msg: 'Мы уже фиксим',
            },
        })
    }

    static open() {
        Router.go(InternalServerErrorPage.pathname)
    }
}
