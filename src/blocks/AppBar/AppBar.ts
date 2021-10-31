import { Block, Template } from '../../modules'
import { AppBarProfile } from './components/Profile'
import { IAppBarProps, IAppBar } from './types'
import _template from './template.tpl'

const template = new Template<IAppBarProps>(_template)

export class AppBar extends Block<IAppBarProps> {
    constructor(props: IAppBar = {}) {
        const { header, action } = props

        super({
            props: {
                profile: new AppBarProfile(),
                header,
                action,
            },
            attributes: {
                class: 'app-bar',
            },
            template,
            tagName: 'nav',
        })
    }
}
