import { Block, Template } from '../../modules'
import {
    AppBar, SideBar, Dialog, MessageForm,
} from '../../blocks'
import { ButtonCircle } from '../../components'
import { AppBarHeader } from '../../blocks/AppBar/components/Header'
import { IActiveChatPage } from './types'
import _template from './template.tpl'
import iconDots from '../../assets/icons/dots.svg'

const template = new Template<IActiveChatPage>(_template)

const abbBar = new AppBar({
    header: new AppBarHeader(),
    action: new ButtonCircle({
        attributes: {
            class: 'button-circle__gray',
        },
        icon: iconDots,
    }),
})

export class ActiveChatPage extends Block<IActiveChatPage> {
    constructor() {
        super({
            props: {
                abbBar,
                sideBar: new SideBar(),
                dialog: new Dialog(),
                messageForm: new MessageForm(),
            },
            template,
        })
    }
}
