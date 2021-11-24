import { Store } from '../Store'
import { IStore } from '../types'
import { getDate, getTime } from '../../../utils/dateTime'
import { IUserChat } from '../../../models/user'
import { getUrlImage } from '../../../utils/urlImages'
import { memoize } from '../../../utils/memoize'
import { arrayLast } from '../../../utils/arrayLast'

export type IUserMessages = {
    user: {
        id: number
        author: string
        src: string | null
        isMy: boolean
    }
    messages: {
        text: string
        time: string
    }[]
}

export type IDayMessages = {
    date: string
    messages: IUserMessages[]
}

export type ISelectMessages = {
    allLoad: boolean
    messages: IDayMessages[]
}

const getDateMemo = memoize<[Date | string], string>(getDate)

const getUser = memoize<[number, IUserChat[]], IUserChat | undefined>(
    (user_id, users) => users.find(({ id }) => id === user_id),
)

const getUserName = memoize<[number, IUserChat[]], string>((...args) => {
    const { display_name, first_name, second_name } = getUser(...args)!
    return display_name || `${first_name} ${second_name}`
})

const getUserAvatar = memoize<[number, IUserChat[]], string | null>((...args) => {
    const { avatar } = getUser(...args)!
    return getUrlImage(avatar)
})

export const selectMessages = Store.makeSelector<ISelectMessages>(
    ({ messages: { data, allLoad }, user, usersChat: { data: usersChat } }: IStore) => {
        // Текущий пользователь
        const { id } = user!

        const dayMessages = data.reduce((acc, message) => {
            const { time, user_id, content } = message

            let lastDay = arrayLast(acc)
            if (getDateMemo(time) !== lastDay?.date) {
                lastDay = {
                    date: getDateMemo(time),
                    messages: [],
                }
                acc.push(lastDay)
            }

            let lastUser = arrayLast(lastDay.messages)
            if (lastUser?.user?.id !== user_id) {
                lastUser = {
                    user: {
                        id: user_id,
                        author: getUserName(user_id, usersChat!),
                        src: getUserAvatar(user_id, usersChat!),
                        isMy: user_id === id,
                    },
                    messages: [],
                }
                lastDay.messages.push(lastUser)
            }

            lastUser.messages.push({
                text: content,
                time: getTime(time),
            })
            return acc
        }, [] as IDayMessages[])

        return {
            allLoad,
            messages: dayMessages,
        }
    },
)

export const selectLastMessage = Store.makeSelector<number>(
    ({ messages: { data } }: IStore) => {
        const last = arrayLast(data)
        return last ? last.id : 0
    },
)
