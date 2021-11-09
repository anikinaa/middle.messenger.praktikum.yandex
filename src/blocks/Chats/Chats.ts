import { Block, Store, Template } from '../../modules'
import { Avatar } from '../../components'
import { ChatsItem } from './components/Item'
import { IChats } from './types'
import _template from './template.tpl'
import { ChatsController } from '../../controllers/chats'
import { selectChats } from '../../modules/Store/selectors/chats'

const template = new Template<IChats>(_template)

export class Chats extends Block<IChats> {
    controller: ChatsController | undefined
    constructor() {
        super({
            props: {
                chats: [],
            },
            attributes: {
                class: 'chats',
            },
            tagName: 'ul',
            template,
        })

        Store.addListenerForProps('chats', () => {
            const data = selectChats(Store.getState())
            const chats = data.map((chat) => new ChatsItem({
                props: {
                    avatar: new Avatar({
                        props: {
                            src: chat.avatar,
                        },
                    }),
                    href: '#',
                    title: chat.title,
                    lastMessage: {
                        content: chat.last_message.content,
                        time: chat.last_message.time,
                    },
                    unreadCount: chat.unread_count,
                },
            }))
            this.setProps({chats})
        })

        const controller = new ChatsController()
        controller.fetchChats().then()
        this.controller = controller
    }
}
