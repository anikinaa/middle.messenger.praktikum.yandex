import { Block, Router, Template, routes } from '@modules'
import { Link } from '@components'
import { IErrorPageProps, IErrorPage } from './types'
import _template from './template.tpl'


const template = new Template(_template)

export class ErrorPage extends Block<IErrorPageProps> {
    constructor({ props }: IErrorPage) {
        const { code, msg } = props

        const backLink = Router.isAuth ? routes.messenger : routes.signIn
        const backText = `Назад к ${Router.isAuth ? 'чатам' : 'авторизации'}`

        super({
            props: {
                code,
                msg,
                link: new Link({
                    props: {
                        text: backText,
                        href: backLink,
                    },
                    events: {
                        click: (e) => {
                            e.stopPropagation()
                            Router.go(backLink)
                        },
                    },
                    attributes: {
                        class: 'link__secondary',
                    },
                }),
            },
            attributes: {
                class: 'error-page',
            },
            template,
        })
    }
}
