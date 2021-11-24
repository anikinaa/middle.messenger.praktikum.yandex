import { IBlock } from '../../modules'

export type IInputProps = {
    value?: string | null
}

export type IInput = Pick<IBlock<IInputProps>, 'attributes' | 'props' | 'events'>;
