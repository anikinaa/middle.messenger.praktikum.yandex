import {Block, IStore, Store, Template} from '../../../../../../modules'
import { joinClassName } from '../../../../../../utils/elementAttr'
import { IChatsItemProps, IChatsItem } from './types'
import _template from './template.tpl'
import {selectActiveIdChat} from "../../../../../../modules/Store/selectors/chats";
import {ChatsController} from "../../../../../../controllers/chats";

const template = new Template<IChatsItemProps>(_template)

export class ChatsItem extends Block<IChatsItemProps> {
    controller: ChatsController | undefined

    constructor(data: IChatsItem) {
        const { props, attributes } = data
        const activeChat = selectActiveIdChat(Store.getState())
        const {id} = props

        const isActive = activeChat === id
        const className = isActive ? 'chat-item chat-item__active' : 'chat-item'

        super({
            props,
            tagName: 'li',
            template,
            attributes: {
                ...attributes,
                class: joinClassName(attributes, className),
            },
            events: {
                click: () => {
                    this.controller?.select(id)
                }
            }
        })

        Store.addListenerForProps('activeChat', this.updateStore.bind(this))

        this.controller = new ChatsController()
    }

    updateStore({activeChat}: IStore){
        this.element?.classList.toggle('chat-item__active', activeChat === this.props.id)
    }

    componentWillUnmount() {

        Store.removeListenerForProps('activeChat', this.updateStore.bind(this))
    }
}
