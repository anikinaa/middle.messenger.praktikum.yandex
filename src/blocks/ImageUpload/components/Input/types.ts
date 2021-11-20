import { IBlock } from '../../../../modules'

export interface IImageUploadInputProps {
    name: string
    value?: string | null
}

export type IImageUploadInput = Pick<
IBlock<IImageUploadInputProps>,
'events' | 'props'
>;
