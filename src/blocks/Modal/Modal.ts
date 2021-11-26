import { Router } from '../../modules/Router'
import { Block } from '../../modules/Block'
import { Template } from '../../modules/Template'
import { Card, ICardProps } from '../../components/Card'
import _template from './template.tpl'
import { IModal, IModalProps } from './types'
import { joinClassName } from '../../utils/elementAttr'

const template = new Template(_template)

export class Modal extends Block<IModalProps> {
    constructor({ props, attributes, onClose = Router.__instance?.back }: IModal) {
        const { header, body } = props
        super({
            props: {
                card: new Card({
                    props: {
                        header,
                        body,
                    },
                }),
            },
            attributes: {
                class: joinClassName(attributes, 'modal'),
            },
            events: {
                click: (e) => {
                    if (e.target === this.element && onClose) {
                        onClose()
                    }
                },
            },
            template,
        })
    }

    setProps(nextProps: Partial<IModalProps>) {
        const props = nextProps as unknown as ICardProps
        this.props.card.setProps(props)
    }
}
