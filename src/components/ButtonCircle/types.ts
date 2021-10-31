import { IBlock } from '../../modules'

export type IButtonCircle = Pick<IBlock<{}>, 'attributes' | 'events'> & {
    icon: string;
    type?: string;
};
