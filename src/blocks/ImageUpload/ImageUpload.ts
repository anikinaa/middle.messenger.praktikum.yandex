import { Block, Template } from '../../modules'
import { Avatar } from '../../components'
import { ImageUploadInput, IImageUploadInputProps } from './components/Input'
import { IImageUploadProps } from './types'
import _template from './template.tpl'

const template = new Template<IImageUploadProps>(_template)

export class ImageUpload extends Block<IImageUploadProps> {
    constructor({ name, value }: IImageUploadInputProps) {
        super({
            props: {
                image: new Avatar({
                    props: {
                        src: value,
                    },
                }),
                input: new ImageUploadInput({
                    props: {
                        name,
                        value,
                    },
                    events: {
                        change: (e) => {
                            const el = e.target as HTMLInputElement
                            if (el.files?.[0]) {
                                const reader = new FileReader()
                                reader.onload = () => {
                                    const src = reader.result as string
                                    this.props.image.setProps({ src })
                                }
                                reader.readAsDataURL(el.files[0])
                            }
                        },
                    },
                }),
            },
            attributes: {
                class: 'image-upload',
            },
            template,
        })
    }
}
