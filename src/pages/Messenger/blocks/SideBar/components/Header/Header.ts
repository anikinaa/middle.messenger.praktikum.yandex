import { Block, Template } from '../../../../../../modules'
import { InputWithIcon, ButtonCircle } from '../../../../../../components'
import { ISideBarHeaderProps } from './types'
import _template from './template.tpl'
import iconSearch from '../../../../../../assets/icons/search.svg'
import iconPlus from '../../../../../../assets/icons/plus.svg'
import { MessengerAddChat } from '../../../AddChat'

const template = new Template<ISideBarHeaderProps>(_template)

export class SideBarHeader extends Block<ISideBarHeaderProps> {
    constructor() {
        console.log('!Q!!!! iconPlus 2',iconPlus);
        const search = new InputWithIcon({
            props: {
                icon: iconSearch,
            },
            attributes: {
                name: 'searchChat',
                placeholder: 'Поиск чата',
            },
        })

        const btnAdd = new ButtonCircle({
            props: {
                icon: iconPlus,
            },
            attributes: {
                class: 'button-circle__secondarysdfsdfs',
            },
            events: {
                click: MessengerAddChat.open,
            },
        })

        super({
            props: {
                search,
                btnAdd,
            },
            attributes: {
                class: 'sidebar_header',
            },
            template,
        })
    }
}
