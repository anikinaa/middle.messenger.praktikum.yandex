import { Block } from '../../modules/Block'
import { Template } from '../../modules/Template'
import { IAvatarProps, IAvatar } from './types'
import _template from './template.tpl'

const template = new Template<IAvatarProps>(_template)

export class Avatar extends Block<IAvatarProps> {
    constructor(data: IAvatar) {
        const { props, events, attributes } = data
        super({
            props,
            events,
            attributes,
            template,
        })
    }
}
