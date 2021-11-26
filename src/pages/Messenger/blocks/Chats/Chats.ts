import { Block } from '../../../../modules/Block'
import { Store } from '../../../../modules/Store'
import { Template } from '../../../../modules/Template'
import { Avatar } from '../../../../components/Avatar'
import { ChatsItem } from './components/Item'
import { IChats } from './types'
import _template from './template.tpl'
import { ChatsController } from '../../../../controllers/chats'
import { selectChats } from '../../../../modules/Store/selectors/chats'

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

        Store.addListenerForProps('chats', this.updateStore.bind(this))
        this.controller = new ChatsController()
        this.controller.fetchChats()?.then()
    }

    updateStore() {
        const data = selectChats(Store.getState())
        const chats = data.map((chat) => new ChatsItem({
            props: {
                id: chat.id,
                avatar: new Avatar({
                    props: {
                        src: chat.avatar,
                    },
                }),
                title: chat.title,
                lastMessage: {
                    content: chat.last_message.content,
                    time: chat.last_message.time,
                },
                unreadCount: chat.unread_count,
            },
        }))
        this.setProps({ chats })
    }

    componentWillUnmount() {
        Store.removeListenerForProps('chats', this.updateStore.bind(this))
    }
}
