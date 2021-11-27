import { IBlock } from '@modules'

export type ButtonCircleProps = {
    icon: string
}

export type IButtonCircle = Omit<IBlock<ButtonCircleProps>, 'tagName' | 'template'> & {
    props: ButtonCircleProps
};
