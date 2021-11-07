import {Form} from "../../../blocks";
import {IAsyncStoreState} from "../../../modules";
import {Button, InputForm, Link} from "../../../components";
import {SignUpPage} from "../../SignUp";
import {getFormData} from "../../../utils/getFormData";
import {AuthController} from "../../../controllers/auth";
import {ISignInFormModel} from "../../../models/signIn";

export class SignInForm extends Form{
    controller: AuthController

    constructor() {
        const controller = new AuthController()
        const {isLoading, error} = controller.getState()

        const fields = [
            new InputForm({
                label: 'Логин',
                attributes: {
                    required: '',
                    type: 'text',
                    name: 'login',
                    // pattern: REGEXP.SANITIZER.PATTERN
                },
                // requirements: REGEXP.SANITIZER.TEXT
            }),
            new InputForm({
                label: 'Пароль',
                attributes: {
                    required: '',
                    type: 'password',
                    name: 'password',
                    autocomplete: 'on',
                },
            }),
        ]

        const submit = new Button({
            props: {
                name: 'Войти',
                isLoading
            },
            attributes: {
                type: 'submit',
                class: 'button__primary',
            }
        })

        super({
            props: {
                fields,
                submit,
                error,
                action: [
                    new Link({
                        href: SignUpPage.pathname,
                        text: 'Зарегистрироваться',
                        events: {
                            click: (e) => {
                                SignUpPage.open()
                                e.preventDefault()
                            }
                        }
                    }),
                ],
            },
            events: {
                submit: async (e) => {
                    e.preventDefault()
                    const data = getFormData(e) as unknown as ISignInFormModel
                    await this.controller.signIn(data)
                },
            },
        });

        this.controller = controller

        this.controller.eventBus!.on(AuthController.EVENT, ({isLoading, error}: IAsyncStoreState) => {
            submit.setProps({isLoading})
            this.setProps({error})
        })
    }
}
