import {
    Block, Store, IStore, Template, pathRoutes,
} from '@modules'
import { selectActiveIdChat } from '@modules/Store/selectors/chats'
import { AppBar } from './blocks/AppBar'
import { SideBar } from './blocks/SideBar'
import { Dialog } from './blocks/Dialog'
import { IMessengerPageProps } from './types'
import _template from './template.tpl'
import { EmptyText } from './blocks/EmptyText'

const template = new Template<IMessengerPageProps>(_template)

const getContent = (activeId: number | null) => (activeId === null ? new EmptyText({
    props: {
        text: 'Выберите чат',
    },
}) : new Dialog())

export class MessengerPage extends Block<IMessengerPageProps> {
    static exact: boolean = false

    static pathname: string = pathRoutes.messenger

    static title: string = 'Мессенджер'

    static privatePage: boolean = true

    constructor() {
        const activeId = selectActiveIdChat(Store.getState())

        super({
            props: {
                abbBar: new AppBar(),
                sideBar: new SideBar(),
                dialog: getContent(activeId),
            },
            template,
        })

        Store.addListenerForProps('activeChat', this.updateStore.bind(this))
    }

    updateStore({ activeChat }: IStore) {
        this.props.dialog.leave()

        this.setProps({
            dialog: getContent(activeChat),
        })
    }

    componentWillUnmount() {
        Store.setState({
            activeChat: null,
        })
        Store.removeListenerForProps('activeChat', this.updateStore.bind(this))
    }
}
