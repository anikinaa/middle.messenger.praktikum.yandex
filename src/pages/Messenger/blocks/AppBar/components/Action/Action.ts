import { Store, Router, routes } from '@modules'
import { selectActiveIdChat } from '@modules/Store/selectors/chats'
import { ButtonCircle } from '@components'
import * as iconDots from '@assets/icons/dots.svg'

export class AppBarAction extends ButtonCircle {
    constructor() {
        const activeId = selectActiveIdChat(Store.getState())

        super({
            props: {
                icon: iconDots,
            },
            attributes: {
                class: `button-circle__gray ${activeId !== null ? '' : 'hidden'}`,
            },
            events: {
                click: () => {
                    Router.go(routes.messengerChatSetting)
                },
            },
        })

        Store.addListenerForProps('activeChat', this.updateSore.bind(this))
    }

    updateSore() {
        const activeId = selectActiveIdChat(Store.getState())
        this.element?.classList.toggle('hidden', activeId === null)
    }

    componentWillUnmount() {
        Store.removeListenerForProps('activeChat', this.updateSore)
    }
}
