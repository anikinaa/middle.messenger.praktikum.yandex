import { IBlock } from '../../modules/Block'

export interface IButtonProps {
    name: string
    isLoading?: boolean
}

export type IButton = Omit<IBlock<IButtonProps>, 'tagName' | 'template'> & {
    props: IButtonProps
};
