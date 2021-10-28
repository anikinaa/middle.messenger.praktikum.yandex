import { Input } from '../Input'
import { IBlock } from '../../modules'

export interface IInputWithIconProps {
    input: Input;
    icon: string;
}

export type IInputWithIcon = Pick<IBlock<IInputWithIconProps>, 'attributes'> & {
    icon: string;
};
