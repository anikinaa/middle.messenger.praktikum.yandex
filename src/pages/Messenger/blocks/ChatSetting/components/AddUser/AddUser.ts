import {
    Store, Router, IAsyncStoreState, pathRoutes,
} from '@modules'
import { selectResultSearchUser } from '@modules/Store/selectors/chatUsers'
import { Modal } from '@blocks'
import { InputForm, Link } from '@components'
import { ChatUsersController } from '@controllers/chatUsers'
import { UserList } from '../../../UserList'

export class MessengerChatAddUser extends Modal {
    static exact: boolean = false

    static pathname: string = pathRoutes.messengerChatAddUser

    static redirect: string = pathRoutes.messenger

    static title: string = 'Добавить пользователя в чат'

    static privatePage: boolean = true

    controller: ChatUsersController

    userList: UserList

    constructor() {
        const users = selectResultSearchUser(Store.getState())

        super({
            props: {
                header: 'Добавить пользователя',
                body: [
                    new InputForm({
                        props: {
                            label: 'Логин прользователя',
                        },
                        attributes: {
                            class: 'left',
                        },
                        events: {
                            input: async (e) => {
                                const login = (e.target as HTMLInputElement).value
                                await this.controller.search(login)
                            },
                        },
                    }),
                    new UserList({
                        props: {
                            users,
                            item: {
                                attributes: {
                                    class: 'chat-users_item__point',
                                },
                                events: {
                                    click: async (e) => {
                                        const el = e.currentTarget as HTMLElement
                                        const id = el.getAttribute('data-id')
                                        await this.controller.addUser(Number(id))
                                    },
                                },
                            },
                        },
                    }),
                    new Link({
                        props: {
                            text: 'Назад',
                            href: pathRoutes.messengerChatSetting,
                        },
                        events: {
                            click: (e) => {
                                e.preventDefault()
                                Router.go(pathRoutes.messengerChatSetting)
                            },
                        },
                    }),
                ],
            },
            attributes: {
                class: 'center',
            },
            onClose: () => {
                Router.go(pathRoutes.messengerChatSetting)
            },
        })

        Store.addListenerForProps('searchUsersChat', this.updateStore.bind(this))

        this.controller = new ChatUsersController()

        this.userList = (this.props.card.props.body as unknown[])[1] as UserList
        this.controller.eventBus!.on(ChatUsersController.EVENT, this.updateLocalStore.bind(this))
    }

    updateStore() {
        const users = selectResultSearchUser(Store.getState())
        this.userList.setProps({ users })
    }

    updateLocalStore({ isLoading }: IAsyncStoreState) {
        this.userList.element?.classList.toggle('loading', isLoading)
    }

    componentWillUnmount() {
        this.controller.eventBus!.off(ChatUsersController.EVENT, this.updateLocalStore.bind(this))
        this.controller.resetSearchUser()
        Store.removeListenerForProps('searchUsersChat', this.updateStore.bind(this))
    }
}
