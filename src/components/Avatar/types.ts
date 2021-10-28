import { IBlock, Block } from '../../modules'

export interface IAvatarProps {
    src?: string;
    className?: string;
    content?: Block<any>;
}

export type IAvatar = Omit<IBlock<IAvatarProps>, 'template' | 'tagName'>;
