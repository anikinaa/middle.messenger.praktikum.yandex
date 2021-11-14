import {Store} from "../Store";
import {IStore} from "../types";
import {IMessage} from "../../../models/message";
import {getDate, getTime} from "../../../utils/dateTime";
import {IUserChat} from "../../../models/user";
import {getUrlImage} from "../../../utils/urlImages";

type IMessageItem = {
    test: string
    time: string
}

export type IDialogDayData = {
    user: {
        author: string
        src: string | null
        isMy: boolean
    }
    messages: IMessageItem[]
}

export const selectMessages = Store.makeSelector<IDialogDayData[]>(
    ({messages, user, usersChat}: IStore) => {
        const {id} = user!
        const data = messages.reduce((dialog: any, msg: IMessage) => {
            const {time, content, user_id} = msg
            const date = getDate(time)
            if (!dialog[date]) {
                dialog[date] = {
                    user: {},
                    messages: []
                }
            }
            if (!dialog[date].user.author) {
                const {display_name, avatar, first_name, second_name} = usersChat.data!.find(({id}) => id === user_id) as IUserChat
                dialog[date].user = {
                    author: display_name || `${first_name} ${second_name}`,
                    src: getUrlImage(avatar),
                    isMy: user_id === id
                }
            }
            dialog[date].messages.push({
                text: content,
                time: getTime(time)
            })

            return dialog
        }, {})

        return Object.entries(data).reduce((acc, [date, messages]) => {
            // @ts-ignore
            acc.push({date, messages})
            return acc
        }, [])
    }
)
