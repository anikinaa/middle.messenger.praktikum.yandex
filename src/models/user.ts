export type IUser = {
    id: number
    login: string
    first_name: string
    second_name: string
    display_name: string
    email: string
    password: string
    phone: string
    avatar: string
}

export type IUserUpdate = Omit<IUser, 'id' | 'password' | 'avatar'>

export type IUserAvatar = { avatar: File }

export type IUserPassword = {
    oldPassword: string,
    newPassword: string
}
