import { Block } from '../../modules'
import { getDefaultType, joinClassName } from '../../utils/elementAttr'
import { IButtonCircle, ButtonCircleProps } from './types'

export class ButtonCircle extends Block<ButtonCircleProps> {

    constructor(data: IButtonCircle) {
        const { props, attributes, events } = data

        super({
            props,
            tagName: 'button',
            attributes: {
                ...attributes,
                class: joinClassName(attributes, 'button-circle'),
                type: getDefaultType(attributes, 'button'),
                style: `background-image: url(${props.icon})`,
            },
            events,
        })

        this.setProps = ({ icon }) => {
            this.element!.style.backgroundImage = `background-image: url(${icon})`
        }
    }

}
