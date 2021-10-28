import { Block, Template } from '../../modules'
import { AppBar, SideBar } from '../../blocks'
import { IChatsPage } from './types'
import _template from './template.tpl'

const template = new Template<IChatsPage>(_template)

export class ChatsPage extends Block<IChatsPage> {
    constructor() {
        super({
            props: {
                abbBar: new AppBar(),
                sideBar: new SideBar(),
            },
            template,
        })
    }
}
