import { Block, Template } from '../../../../modules'
import { AppBarProfile } from './components/Profile'
import { AppBarHeader } from './components/Header'
import { AppBarAction } from './components/Action'
import _template from './template.tpl'
import { IAppBarProps } from './types'

const template = new Template<IAppBarProps>(_template)

export class AppBar extends Block<IAppBarProps> {
    constructor() {
        super({
            props: {
                profile: new AppBarProfile(),
                header: new AppBarHeader(),
                action: new AppBarAction(),
            },
            attributes: {
                class: 'app-bar',
            },
            template,
            tagName: 'nav',
        })
    }
}
