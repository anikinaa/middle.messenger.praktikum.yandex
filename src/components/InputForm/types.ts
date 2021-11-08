import { IBlock } from '../../modules'
import { Input } from '../Input'

export interface IInputFormProps {
    input: Input;
    label: string;
    requirements?: string;
}

export type IInputForm = Pick<IBlock<IInputFormProps>, 'attributes'> & {
    value?: string | undefined
    label: string;
    requirements?: string;
};
