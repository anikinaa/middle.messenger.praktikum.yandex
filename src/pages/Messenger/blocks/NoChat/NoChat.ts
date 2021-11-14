import {Block} from "../../../../modules";
import {Template} from "../../../../modules";
import _template from './teimplate.tpl'

const template = new Template(_template)

export class NoChat extends Block {
    constructor() {
        super({
            attributes: {
                class: 'no-chat'
            },
            template
        });
    }
}
