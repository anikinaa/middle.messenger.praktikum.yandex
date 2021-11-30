import { Block, Template } from '@modules'
import { IImageUploadInputProps, IImageUploadInput } from './types'
import _template from './template.tpl'

const template = new Template<IImageUploadInputProps>(_template)

export class ImageUploadInput extends Block<IImageUploadInputProps> {
    constructor({ props, events }: IImageUploadInput) {
        super({
            props,
            tagName: 'label',
            attributes: {
                class: 'image-upload_button',
            },
            template,
            events,
        })
    }
}
