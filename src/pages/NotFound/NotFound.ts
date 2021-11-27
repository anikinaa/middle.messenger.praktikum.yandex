import { pathRoutes } from '@modules'
import { ErrorPage } from '@blocks'

export class NotFoundPage extends ErrorPage {
    static exact: boolean = true

    static pathname: string = pathRoutes.notFound

    static title: string = 'Упс, вы не туда попали'

    constructor() {
        super({
            props: {
                code: '404',
                msg: 'Упс, вы не туда попали',
            },
        })
    }
}
