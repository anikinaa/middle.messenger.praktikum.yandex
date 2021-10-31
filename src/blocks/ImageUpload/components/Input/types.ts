import { IBlock } from '../../../../modules'

export interface IImageUploadInputProps {
    name: string;
    value?: string;
}

export type IImageUploadInput = Pick<
IBlock<IImageUploadInputProps>,
'events' | 'props'
>;
