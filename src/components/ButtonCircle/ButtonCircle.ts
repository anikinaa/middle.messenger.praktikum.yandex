import { Block } from '../../modules'
import { getDefaultType, joinClassName } from '../../utils/elementAttr'
import { IButtonCircle } from './types'

export class ButtonCircle extends Block<{}> {
    constructor(data: IButtonCircle) {
        const { icon, attributes, events } = data

        super({
            tagName: 'button',
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'button-circle'),
                type: getDefaultType(attributes!, 'button'),
                style: `background-image: url(${icon})`,
            },
            events,
        })
    }
}
