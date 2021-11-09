import { Block, Template } from '../../../../modules'
import { Avatar } from '../../../../components'
import { IAppBarHeader, IAppBarHeaderProps } from './types'
import _template from './template.tpl'

const template = new Template<IAppBarHeaderProps>(_template)

export class AppBarHeader extends Block<IAppBarHeaderProps> {
    constructor({props: {avatar: src, name}}: IAppBarHeader) {

        const avatar = new Avatar({
            props: {src},
        })

        super({
            props: {
                avatar,
                name,
            },
            attributes: {
                class: 'chat-header',
            },
            template,
        })
    }

    setProps({ name }: Partial<IAppBarHeaderProps>) {
        super.setProps({name});
    }
}
