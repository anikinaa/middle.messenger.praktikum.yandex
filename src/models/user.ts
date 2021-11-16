export type IUser = {
    id: number
    login: string
    first_name: string
    second_name: string
    display_name: string | null
    email: string
    phone: string
    avatar: string | null
}

export enum UserRule {
    admin = 'admin',
    regular = 'regular'
}

export type IUserChat = IUser & {
    role: UserRule
}

export type IUserForm = IUser & {
    password: string
}

export type IUserUpdate = Omit<IUserForm, 'id' | 'password' | 'avatar'>

export type IUserPassword = {
    oldPassword: string,
    newPassword: string
}

export type IUserPasswordForm = IUserPassword & {
    repeat_newPassword: string
}
