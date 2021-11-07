import {IUser} from "./user";

export type ISignUpFormModel = Omit<IUser, 'id' | 'avatar'> & {
    repeat_password: string
}

export type ISignUpRequestModel = Omit<IUser, 'id' | 'avatar'>
