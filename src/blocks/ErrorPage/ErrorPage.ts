import { Block } from '../../modules/Block'
import { Router } from '../../modules/Router'
import { Template } from '../../modules/Template'
import { Link } from '../../components/Link'
import { IErrorPageProps, IErrorPage } from './types'
import _template from './template.tpl'

const template = new Template(_template)

export class ErrorPage extends Block<IErrorPageProps> {
    constructor({ props }: IErrorPage) {
        const { code, msg } = props

        const backLink = Router.isAuth ? '/messenger' : '/'
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
