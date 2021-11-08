import { Block, Template } from "../../modules";
import { Card, ICardProps } from '../../components'
import _template from './template.tpl'
import { IModalProps } from './types'

const template = new Template(_template)

export class Modal extends Block<IModalProps> {
    constructor({header, body}: ICardProps) {
        super({
            props: {
                card: new Card({
                    props: { header, body }
                })
            },
            attributes: {
                class: 'modal'
            },
            template
        });
    }
}
