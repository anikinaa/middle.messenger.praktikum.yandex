import { Block, Template, Router, routes } from '@modules'
import { InputWithIcon, ButtonCircle } from '@components'
import { ISideBarHeaderProps } from './types'
import _template from './template.tpl'
import * as iconSearch from '@assets/icons/search.svg'
import * as iconPlus from '@assets/icons/plus.svg'

const template = new Template<ISideBarHeaderProps>(_template)

export class SideBarHeader extends Block<ISideBarHeaderProps> {
    constructor() {
        const search = new InputWithIcon({
            props: {
                icon: iconSearch,
            },
            attributesInput: {
                name: 'searchChat',
                placeholder: 'Поиск чата',
            },
        })

        const btnAdd = new ButtonCircle({
            props: {
                icon: iconPlus,
            },
            attributes: {
                class: 'button-circle__secondary',
            },
            events: {
                click: () => {
                    Router.go(routes.messengerAddChat)
                }
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
