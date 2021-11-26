import { Router } from '../../modules/Router'
import { ErrorPage } from '../../blocks/ErrorPage'

export class NotFoundPage extends ErrorPage {
    static exact: boolean = true

    static pathname: string = '/404'

    static title: string = 'Упс, вы не туда попали'

    constructor() {
        super({
            props: {
                code: '404',
                msg: 'Упс, вы не туда попали',
            },
        })
    }

    static open() {
        Router.go(NotFoundPage.pathname)
    }
}
