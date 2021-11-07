import { IBlock } from '../../modules'

export type IInput = Pick<IBlock<{}>, 'attributes'> & {
    value: string | null | undefined
};
