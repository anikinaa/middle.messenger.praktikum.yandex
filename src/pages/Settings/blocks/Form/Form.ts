import {Form} from "../../../../blocks/Form";
import {Button, InputForm, Link} from "../../../../components";
import {getFormData} from "../../../../utils/getFormData";
import {REGEXP} from "../../../../utils/REGEXP";
import {IAsyncStoreState, Store} from "../../../../modules";
import {selectUser} from "../../../../modules/Store/selectors/user";
import {UserController} from "../../../../controllers/user";
import {IUserUpdate} from "../../../../models/user";
import { SettingPassword } from '../Password'

export class SettingForm extends Form {
    controller: UserController | undefined

    constructor() {
        const {email, login, first_name, second_name, display_name, phone} = selectUser(Store.getState())

        const fields: InputForm[] = [
            new InputForm({
                value: email,
                label: 'Почта',
                attributes: {
                    required: '',
                    type: 'email',
                    name: 'email',
                    pattern: REGEXP.EMAIL.PATTERN,
                },
                requirements: REGEXP.EMAIL.TEXT,
            }),
            new InputForm({
                value: login,
                label: 'Логин',
                attributes: {
                    required: '',
                    type: 'text',
                    name: 'login',
                    pattern: REGEXP.LOGIN.PATTERN,
                },
                requirements: REGEXP.LOGIN.TEXT,
            }),
            new InputForm({
                value: first_name,
                label: 'Имя',
                attributes: {
                    required: '',
                    type: 'text',
                    name: 'first_name',
                    pattern: REGEXP.NAME.PATTERN,
                },
                requirements: REGEXP.NAME.TEXT,
            }),
            new InputForm({
                value: second_name,
                label: 'Фамилия',
                attributes: {
                    required: '',
                    type: 'text',
                    name: 'second_name',
                    pattern: REGEXP.NAME.PATTERN,
                },
                requirements: REGEXP.NAME.TEXT,
            }),
            new InputForm({
                value: display_name,
                label: 'Имя в чате',
                attributes: {
                    type: 'text',
                    name: 'display_name',
                },
            }),
            new InputForm({
                value: phone,
                label: 'Телефон',
                attributes: {
                    required: '',
                    type: 'text',
                    name: 'phone',
                    pattern: REGEXP.PHONE.PATTERN,
                },
                requirements: REGEXP.PHONE.TEXT,
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
                        text: 'Сменить пароль',
                        href: SettingPassword.pathname,
                        attributes: {
                            class: 'link__block',
                        },
                        events: {
                            click: (e) => {
                                e.preventDefault()
                                SettingPassword.open()
                            }
                        }
                    }),
                    new Link({
                        text: 'Выйти',
                        href: '/',
                        attributes: {
                            class: 'link__block link__danger',
                        },
                        events: {
                            click: (e) => {
                                e.preventDefault()
                                this.controller?.logout()
                            }
                        }
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
        });

        Store.addListenerForProps('user', () => {
            const {
                email, login, first_name,
                second_name, display_name,
                phone
            } = selectUser(Store.getState())

            const fields = this.props.fields as InputForm[]
            fields[0].setValue(email)
            fields[1].setValue(login)
            fields[2].setValue(first_name)
            fields[3].setValue(second_name)
            fields[4].setValue(display_name)
            fields[5].setValue(phone)
        })

        const controller = new UserController()
        controller.eventBus!.on(UserController.EVENT, ({isLoading, error}: IAsyncStoreState) => {
            this.props.submit.setProps({isLoading})
            this.setProps({error})
        })
        controller!.response()?.then()
        this.controller = controller
    }
}
