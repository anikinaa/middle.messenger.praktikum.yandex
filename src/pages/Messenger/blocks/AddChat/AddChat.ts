import { IAsyncStoreState, Router } from '../../../../modules'
import { Form } from '../../../../blocks'
import { Modal } from '../../../../blocks/Modal'
import { Button, InputForm, Link } from '../../../../components'
import { getFormData } from '../../../../utils/getFormData'
import { MessengerPage } from '../../Messenger'
import { ChatsController } from '../../../../controllers/chats'
import { IChatTitle } from '../../../../models/chat'

export class MessengerAddChat extends Modal{
    static exact: boolean = false
    static pathname: string = '/messenger/add-chat'
    static title: string = 'Добавление чата'
    static privatePage: boolean = true

    controller: ChatsController | undefined

    constructor() {
        const submit = new Button({
            props: {
                name: 'Добавить'
            },
            attributes: {
                type: 'submit',
                class: 'button__primary'
            }
        })

        const fields = [
            new InputForm({
                props: {
                    label: 'Название чата',
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'title',
                },
            }),
        ]

        const cancel = new Link({
            props: {
                text: 'Отменить',
                href: MessengerPage.pathname,
            },
            attributes: {
                class: 'link__block',
            },
            events: {
                click: (e) => {
                    e.preventDefault()
                    MessengerPage.open()
                }
            }
        })

        const form = new Form({
            props: {
                fields,
                submit,
                error: null,
                action: [cancel],
            },
            events: {
                submit: (e) => {
                    const data = getFormData(e) as unknown as IChatTitle
                    this.controller?.addChat(data)
                    e.preventDefault()
                }
            }
        })

        super({
            props: {
                header: 'Добавление чата',
                body: form
            },
            onClose: MessengerPage.open
        });

        this.controller = new ChatsController()

        this.controller.eventBus!.on(ChatsController.EVENT, this.updateLocalStore.bind(this))
    }

    updateLocalStore({isLoading, error}: IAsyncStoreState) {
        const form = this.props.card.props.body as Form
        form.setProps({error})
        form.props.submit.setProps({isLoading})
    }

    protected componentWillUnmount() {
        this.controller!.eventBus!.off(ChatsController.EVENT, this.updateLocalStore.bind(this))
    }

    static open() {
        Router.go(MessengerAddChat.pathname)
    }

}
