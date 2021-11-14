import {Block, IStore, Router, Store, Template} from '../../modules'
import {
    AppBar, SideBar, Dialog,
} from '../../blocks'
import { IMessengerPageProps } from './types'
import _template from './template.tpl'
import {selectActiveIdChat} from "../../modules/Store/selectors/chats";
import {NoChat} from "./blocks/NoChat";

const template = new Template<IMessengerPageProps>(_template)

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
                dialog: activeId === null ? new NoChat() : new Dialog(),
            },
            template,
        })

        Store.addListenerForProps('activeChat', this.updateStore.bind(this))
    }

    updateStore({activeChat}: IStore){
        this.props.dialog.leave()

        this.setProps({
            dialog: activeChat === null ? new NoChat() : new Dialog(),
        })
    }

    static open() {
        Router.go(MessengerPage.pathname)
    }

    componentWillUnmount() {
        Store.setState({
            activeChat: null
        })
        Store.removeListenerForProps('activeChat', this.updateStore.bind(this))
    }
}
