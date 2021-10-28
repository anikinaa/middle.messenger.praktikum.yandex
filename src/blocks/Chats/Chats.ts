import { Block, Template } from '../../modules'
import { Avatar } from '../../components'
import { ChatsItem } from './components/Item'
import { IChats } from './types'
import _template from './template.tpl'

const template = new Template<IChats>(_template)

const item = new ChatsItem({
    props: {
        avatar: new Avatar({
            props: {
                src: '/static/images/avatar.jpg',
            },
        }),
        href: './active.html',
        title: 'title',
        lastMessage: {
            content: 'canplay',
            time: '14:50',
        },
        unreadCount: 50,
    },
})

export class Chats extends Block<IChats> {
    constructor() {
        super({
            props: {
                chats: [item],
            },
            attributes: {
                class: 'chats',
            },
            tagName: 'ul',
            template,
        })
    }
}
