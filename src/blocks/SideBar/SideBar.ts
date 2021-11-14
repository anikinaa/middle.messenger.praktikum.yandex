import { Block, Template } from '../../modules'
import { Chats } from '../../pages/Messenger/blocks/Chats'
import { SideBarHeader } from './components/Header'
import { ISideBarProps } from './types'
import _template from './template.tpl'

const template = new Template<ISideBarProps>(_template)

export class SideBar extends Block<ISideBarProps> {
    constructor() {
        super({
            props: {
                header: new SideBarHeader(),
                body: new Chats(),
            },
            tagName: 'aside',
            attributes: {
                class: 'sidebar',
            },
            template,
        })
    }
}
