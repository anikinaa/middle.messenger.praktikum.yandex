import { Modal } from '../../../../../../blocks/Modal'
import { MessengerChatSetting } from '../../ChatSetting'
import { Router, Store } from '../../../../../../modules'
import { InputForm } from '../../../../../../components'
import { ChatUsersController } from '../../../../../../controllers/chatUsers'
import { UserList } from '../../../UserList'
import { selectResultSearchUser } from '../../../../../../modules/Store/selectors/chatUsers'


export class MessengerChatAddUser extends Modal {
    static exact: boolean = false
    static pathname: string = '/messenger/chat-setting/add-user'
    // static redirect: string = '/messenger'
    static title: string = 'Добавить пользователя в чат'
    static privatePage: boolean = true

    controller: ChatUsersController

    constructor() {
        const users = selectResultSearchUser(Store.getState())

        super({
            props: {
                header: 'Добавить пользователя',
                body: [
                    new InputForm({
                        props: {
                            label: "Логин прользователя"
                        },
                        attributes: {
                            class: 'left'
                        },
                        events: {
                            input: async (e) => {
                                const login = (e.target as HTMLInputElement).value
                                await this.controller.search(login)
                            }
                        }
                    }),
                    new UserList({
                        props: {
                            users,
                            item: {
                                attributes: {
                                    class: 'chat-users_item__point'
                                },
                                events: {
                                    click: async (e) => {
                                        const el = e.currentTarget as HTMLElement
                                        const id = el.getAttribute('data-id')
                                        await this.controller.addUser(Number(id))
                                    }
                                }
                            }
                        }
                    }),
                ]
            },
            attributes: {
                class: 'center'
            },
            onClose: MessengerChatSetting.open
        })


        Store.addListenerForProps('searchUsersChat', () => {
            const users = selectResultSearchUser(Store.getState())
            // @ts-ignore
            this.props.card.props.body[1].setProps({users})
        })

        this.controller = new ChatUsersController()
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.controller.resetSearchUser()
    }

    static open () {
        Router.go(MessengerChatAddUser.pathname)
    }

}