import { Block, Template } from '../../../../modules'
import { InputWithIcon, ButtonCircle } from '../../../../components'
import { ISideBarHeaderProps } from './types'
import _template from './template.tpl'
import iconSearch from '../../../../assets/icons/search.svg'
import iconPlus from '../../../../assets/icons/plus.svg'

const template = new Template<ISideBarHeaderProps>(_template)

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
        icon: iconPlus
    },
    attributes: {
        class: 'button-circle__secondary',
    },
})

export class SideBarHeader extends Block<ISideBarHeaderProps> {
    constructor() {
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
