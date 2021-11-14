import {Store} from "../Store";
import {IStore} from "../types";
import {IMessage} from "../../../models/message";
import {getDate, getTime} from "../../../utils/dateTime";
import {IUserChat} from "../../../models/user";
import {getUrlImage} from "../../../utils/urlImages";

export type IUserMessages = {
    user: {
        author: string
        src: string | null
        isMy: boolean
    }
    messages: {
        test: string
        time: string
    }[]
}

export type IDayMessages = {
    date: string
    messages: IUserMessages[]
}

export const selectMessages = Store.makeSelector<IDayMessages[]>(
    ({messages, user, usersChat}: IStore) => {
        const {id} = user!
        const data = messages.reduce((dialog: any, msg: IMessage) => {
            const {time, content, user_id} = msg
            const date = getDate(time)
            if (!dialog[date]) {
                dialog[date] = {}
            }
            if (!dialog[date][user_id]) {
                dialog[date][user_id] = {
                    user: {},
                    messages: []
                }
            }
            if (!dialog[date][user_id].user.author) {
                const {
                    display_name,
                    avatar,
                    first_name,
                    second_name
                } = usersChat.data!.find(({id}) => id === user_id) as IUserChat
                dialog[date][user_id].user = {
                    author: display_name || `${first_name} ${second_name}`,
                    src: getUrlImage(avatar),
                    isMy: user_id === id
                }
            }
            dialog[date][user_id].messages.push({
                text: content,
                time: getTime(time)
            })

            return dialog
        }, {})

        return Object.entries(data).reduce((acc, [date, users]) => {
            // @ts-ignore
            acc.push({
                date, 
                messages: Object.values(users)
            })
            return acc
        }, [])
    }
)
