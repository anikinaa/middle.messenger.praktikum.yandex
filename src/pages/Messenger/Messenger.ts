import {
    Block, IStore, Router, Store, Template,
} from '../../modules'
import {
    AppBar, SideBar, Dialog,
} from '../../blocks'
import { IMessengerPageProps } from './types'
import _template from './template.tpl'
import { selectActiveIdChat } from '../../modules/Store/selectors/chats'
import { EmptyText } from './blocks/EmptyText'

const template = new Template<IMessengerPageProps>(_template)

const getContent = (activeId: number | null) => (activeId === null ? new EmptyText({
    props: {
        text: 'Выберите чат',
    },
}) : new Dialog())

export class MessengerPage extends Block<IMessengerPageProps> {
    static exact: boolean = false

    static pathname: string = '/messenger'

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

    static open() {
        Router.go(MessengerPage.pathname)
    }

    componentWillUnmount() {
        Store.setState({
            activeChat: null,
        })
        Store.removeListenerForProps('activeChat', this.updateStore.bind(this))
    }
}
