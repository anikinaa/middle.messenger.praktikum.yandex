import { IUserForm } from './user'

export type ISignUpFormModel = Omit<IUserForm, 'id' | 'avatar'> & {
    repeat_password: string
}

export type ISignUpRequestModel = Omit<IUserForm, 'id' | 'avatar'>
