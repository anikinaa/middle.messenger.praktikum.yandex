import { IBlock } from '../../modules'

export interface IButtonProps {
    name: string;
}

export type IButton = Omit<IBlock<IButtonProps>, 'tagName' | 'template'>;
