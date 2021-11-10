import {Block, Router, Template} from "../../modules";
import {Card} from '../../components'
import _template from './template.tpl'
import {IModal, IModalProps} from "./types";
import { joinClassName } from '../../utils/elementAttr'

const template = new Template(_template)

export class Modal extends Block<IModalProps> {
    constructor({props, attributes, onClose = Router.__instance?.back}: IModal) {
        const {header, body} = props
        super({
            props: {
                card: new Card({
                    props: {
                        header,
                        body
                    }
                })
            },
            attributes: {
                class: joinClassName(attributes, 'modal')
            },
            events: {
                click: (e) => {
                    if (e.target === this.element) {
                        onClose && onClose()
                    }
                }
            },
            template
        });
    }
}
