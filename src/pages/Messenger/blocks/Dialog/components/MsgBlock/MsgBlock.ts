import { Block, Template } from '@modules'
import { IUserMessages } from '@modules/Store/selectors/messages'
import { Avatar } from '@components'
import { DialogMsgItem } from '../MsgItem'
import { IDialogMsgBlockProps } from './types'
import _template from './template.tpl'

const template = new Template<IDialogMsgBlockProps>(_template)

export class DialogMsgBlock extends Block<IDialogMsgBlockProps> {
    constructor({ user: { author, src, isMy }, messages }: IUserMessages) {
        super({
            props: {
                avatar: new Avatar({
                    props: {
                        src,
                        className: 'avatar__small',
                    },
                }),
                messages: messages.map(
                    ({ text, time }) => new DialogMsgItem({ text, time, author }),
                ),
            },
            attributes: {
                class: `user-messages ${isMy ? 'user-messages__right' : 'user-messages__left'}`,
            },
            template,
        })
    }
}
