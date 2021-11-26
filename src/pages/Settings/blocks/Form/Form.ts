import { Form } from '../../../../blocks/Form'
import { Link } from '../../../../components/Link'
import { Button } from '../../../../components/Button'
import { InputForm } from '../../../../components/InputForm'
import { getFormData } from '../../../../utils/getFormData'
import { REGEXP } from '../../../../utils/REGEXP'
import { IStore, Store } from '../../../../modules/Store'
import { IAsyncStoreState } from '../../../../modules/AsyncStore'
import { selectUser } from '../../../../modules/Store/selectors/user'
import { UserController } from '../../../../controllers/user'
import { IUserUpdate } from '../../../../models/user'
import {Router} from "../../../../modules/Router";

export class SettingForm extends Form {
    controller: UserController | undefined

    constructor() {
        const {
            email, login, first_name, second_name, display_name, phone,
        } = selectUser(Store.getState())

        const fields: InputForm[] = [
            new InputForm({
                props: {
                    value: email,
                    label: 'Почта',
                    requirements: REGEXP.EMAIL.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'email',
                    name: 'email',
                    pattern: REGEXP.EMAIL.PATTERN,
                },
            }),
            new InputForm({
                props: {
                    value: login,
                    label: 'Логин',
                    requirements: REGEXP.LOGIN.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'login',
                    pattern: REGEXP.LOGIN.PATTERN,
                },
            }),
            new InputForm({
                props: {
                    value: first_name,
                    label: 'Имя',
                    requirements: REGEXP.NAME.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'first_name',
                    pattern: REGEXP.NAME.PATTERN,
                },
            }),
            new InputForm({
                props: {
                    value: second_name,
                    label: 'Фамилия',
                    requirements: REGEXP.NAME.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'second_name',
                    pattern: REGEXP.NAME.PATTERN,
                },
            }),
            new InputForm({
                props: {
                    value: display_name,
                    label: 'Имя в чате',
                },
                attributesInput: {
                    type: 'text',
                    name: 'display_name',
                },
            }),
            new InputForm({
                props: {
                    value: phone,
                    label: 'Телефон',
                    requirements: REGEXP.PHONE.TEXT,
                },
                attributesInput: {
                    required: '',
                    type: 'text',
                    name: 'phone',
                    pattern: REGEXP.PHONE.PATTERN,
                },
            }),
        ]

        const submit = new Button({
            props: {
                name: 'Сохранить',
            },
            attributes: {
                type: 'submit',
                class: 'button__primary',
            },
        })

        super({
            props: {
                fields,
                submit,
                error: null,
                action: [
                    new Link({
                        props: {
                            text: 'Сменить пароль',
                            href: '/settings/password',
                        },
                        attributes: {
                            class: 'link__block',
                        },
                        events: {
                            click: (e) => {
                                e.preventDefault()
                                Router.go('/settings/password')
                            },
                        },
                    }),
                    new Link({
                        props: {
                            text: 'Выйти',
                            href: '/',
                        },
                        attributes: {
                            class: 'link__block link__danger',
                        },
                        events: {
                            click: (e) => {
                                e.preventDefault()
                                this.controller?.logout()
                            },
                        },
                    }),
                ],
            },
            events: {
                submit: async (e) => {
                    e.preventDefault()
                    const data = getFormData(e) as unknown as IUserUpdate
                    await this.controller!.update(data)
                },
            },
        })

        Store.addListenerForProps('user', this.updateStore.bind(this))

        const controller = new UserController()
        controller.eventBus!.on(UserController.EVENT, ({ isLoading, error }: IAsyncStoreState) => {
            this.props.submit.setProps({ isLoading })
            this.setProps({ error })
        })
        controller.response()?.then()
        this.controller = controller
    }

    updateStore({ user }:IStore) {
        const {
            email, login, first_name,
            second_name, display_name,
            phone,
        } = user!

        const fields = this.props.fields as InputForm[]
        fields[0].setProps({
            value: email,
        })
        fields[1].setProps({
            value: login,
        })
        fields[2].setProps({
            value: first_name,
        })
        fields[3].setProps({
            value: second_name,
        })
        fields[4].setProps({
            value: display_name,
        })
        fields[5].setProps({
            value: phone,
        })
    }

    componentWillUnmount() {
        Store.removeListenerForProps('user', this.updateStore.bind(this))
    }
}
