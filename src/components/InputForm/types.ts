import { IBlock } from '../../modules'
import { Input } from '../Input'

export interface IInputFormProps {
    input: Input;
    label: string;
    requirements?: string;
}

export type IInputForm = Pick<IBlock<IInputFormProps>, 'attributes'> & {
    label: string;
    requirements?: string;
};
