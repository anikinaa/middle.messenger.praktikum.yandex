import { IBlock } from '../../modules/Block'

export type IInputProps = {
    value?: string | null
}

export type IInput = Pick<IBlock<IInputProps>, 'attributes' | 'props' | 'events'>;
