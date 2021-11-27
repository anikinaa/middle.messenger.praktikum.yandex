import {routes} from "@modules";
import { ErrorPage } from '@blocks'

export class InternalServerErrorPage extends ErrorPage {
    static exact: boolean = true

    static pathname: string = routes.internalServerError

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
