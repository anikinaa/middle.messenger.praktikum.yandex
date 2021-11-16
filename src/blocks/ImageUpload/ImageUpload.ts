import { Block, Template } from '../../modules'
import { Avatar } from '../../components'
import { ImageUploadInput } from './components/Input'
import { IImageUploadProps, IImageUpload } from './types'
import _template from './template.tpl'

const template = new Template<IImageUploadProps>(_template)

export class ImageUpload extends Block<IImageUploadProps> {
    constructor({
        name, value, callback, error, isLoading,
    }: IImageUpload) {
        const className = isLoading ? 'image-upload image-upload__loading' : 'image-upload'
        super({
            props: {
                error,
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
                            const file = el.files?.[0]
                            if (file) {
                                callback(file)
                            }
                        },
                    },
                }),
            },
            attributes: {
                class: className,
            },
            template,
        })
    }

    setLoading(isLoading: boolean) {
        this.element?.classList.toggle('image-upload__loading', isLoading)
    }
}
