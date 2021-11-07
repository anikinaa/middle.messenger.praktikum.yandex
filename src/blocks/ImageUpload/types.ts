import { Avatar } from '../../components'
import { ImageUploadInput } from './components/Input'
import {IImageUploadInputProps} from "./components/Input";

export type IImageUpload = IImageUploadInputProps & {
    callback: (file: File) => void
    error?: string | null
    isLoading?: boolean | null
}
export interface IImageUploadProps {
    image: Avatar;
    input: ImageUploadInput;
    error?: string | null
    isLoading?: boolean | null
}
