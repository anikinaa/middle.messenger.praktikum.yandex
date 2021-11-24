import { IBlock } from '../../modules'

export interface IAvatarProps {
    src?: string | null
    className?: string
}

export type IAvatar = Omit<IBlock<IAvatarProps>, 'template' | 'tagName'> & {
    props: IAvatarProps
};
