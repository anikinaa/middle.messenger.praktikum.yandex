import { IBlock } from '../../modules/Block'

export type ButtonCircleProps = {
    icon: string
}

export type IButtonCircle = Omit<IBlock<ButtonCircleProps>, 'tagName' | 'template'> & {
    props: ButtonCircleProps
};
