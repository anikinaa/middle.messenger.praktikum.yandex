import { pathRoutes } from '@modules'
import { ErrorPage } from '@blocks'

export class InternalServerErrorPage extends ErrorPage {
    static exact: boolean = true

    static pathname: string = pathRoutes.internalServerError

    static title: string = 'Мы уже фиксим'

    constructor() {
        super({
            props: {
                code: '5**',
                msg: 'Мы уже фиксим',
            },
        })
    }
}
