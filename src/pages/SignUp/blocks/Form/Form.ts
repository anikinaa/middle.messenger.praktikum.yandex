import {Form} from "../../../../blocks/Form/Form";
import {AuthController} from "../../../../controllers/auth";
import {Button, InputForm, Link} from "../../../../components";
import {REGEXP} from "../../../../utils/REGEXP";
import {IAsyncStoreState} from "../../../../modules";
import {SignInPage} from "../../../SignIn";
import {getFormData} from "../../../../utils/getFormData";
import {ISignUpFormModel} from "../../../../models/signUp";

export class SignUpForm extends Form{
    controller: AuthController

    constructor() {
        const controller = new AuthController()
        const {isLoading, error} = controller.getState()

        const fields = [
            new InputForm({
                label: 'Почта',
                attributes: {
                    required: '',
                    type: 'email',
                    name: 'email',
                    pattern: REGEXP.EMAIL.PATTERN,
                    class: 'input-form__required'
                },
                requirements: REGEXP.EMAIL.TEXT,
            }),
            new InputForm({
                label: 'Имя',
                attributes: {
                    required: '',
                    type: 'text',
                    name: 'first_name',
                    pattern: REGEXP.NAME.PATTERN,
                    class: 'input-form__required'
                },
                requirements: REGEXP.NAME.TEXT,
            }),
            new InputForm({
                label: 'Фамилия',
                attributes: {
                    required: '',
                    type: 'text',
                    name: 'second_name',
                    pattern: REGEXP.NAME.PATTERN,
                    class: 'input-form__required'
                },
                requirements: REGEXP.NAME.TEXT,
            }),
            new InputForm({
                label: 'Логин',
                attributes: {
                    required: '',
                    type: 'text',
                    name: 'login',
                    pattern: REGEXP.LOGIN.PATTERN,
                    class: 'input-form__required'
                },
                requirements: REGEXP.LOGIN.TEXT,
            }),
            new InputForm({
                label: 'Телефон',
                attributes: {
                    required: '',
                    type: 'text',
                    name: 'phone',
                    pattern: REGEXP.PHONE.PATTERN,
                    class: 'input-form__required'
                },
                requirements: REGEXP.PHONE.TEXT,
            }),
            new InputForm({
                label: 'Пароль',
                attributes: {
                    required: '',
                    type: 'password',
                    name: 'password',
                    pattern: REGEXP.PASSWORD.PATTERN,
                    autocomplete: 'on',
                    class: 'input-form__required'
                },
                requirements: REGEXP.PASSWORD.TEXT,
            }),
            new InputForm({
                label: 'Повторите пароль',
                attributes: {
                    required: '',
                    type: 'password',
                    name: 'repeat_password',
                    pattern: REGEXP.PASSWORD.PATTERN,
                    autocomplete: 'on',
                    class: 'input-form__required'
                },
                requirements: REGEXP.PASSWORD.TEXT,
            }),
        ]

        const submit = new Button({
            props: {
                name: 'Зарегистрироваться',
                isLoading
            },
            attributes: {
                type: 'submit',
                class: 'button__primary',
            }
        })

        const signIn = new Link({
            text: 'Войти',
            href: SignInPage.pathname,
            events: {
                click: (e) => {
                    SignInPage.open()
                    e.preventDefault()
                }
            }
        })

        super({
            props: {
                fields,
                submit,
                error,
                action: [signIn],
            },
            events: {
                submit: async (e) => {
                    e.preventDefault()
                    const data = getFormData(e) as unknown as ISignUpFormModel
                    await this.controller.signUp(data)
                },
            },
        })

        this.controller = controller

        this.controller.eventBus!.on(AuthController.EVENT, ({isLoading, error}: IAsyncStoreState) => {
            submit.setProps({isLoading})
            this.setProps({error})
        })

    }
}
