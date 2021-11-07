import { Template, Block, Router } from '../../modules'
import { Card} from '../../components'
import { ISignInPageProps } from './type'
import _template from './template.tpl'
import {SignInForm} from "./blocks";

const template = new Template(_template)

export class SignInPage extends Block<ISignInPageProps> {
    static pathname: string = '/'
    static title: string = 'Авторизация'
    static privatePage: boolean = false

    constructor() {
        super({
            props: {
                card: new Card({
                    props: {
                        header: 'Авторизация',
                        body: [new SignInForm()],
                    },
                }),
            },
            template,
        })
    }

    // @ts-ignore
    protected componentDidMount(oldProps: {} | ISignInPageProps) {
        document.body.classList.add('body__dark')
    }

    static open() {
        Router.go(SignInPage.pathname)
    }
}
