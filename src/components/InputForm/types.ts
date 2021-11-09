import { IBlock } from '../../modules'
import { IInputProps, Input } from '../Input'

export type IInputFormProps = {
    input: Input;
    label: string;
    requirements?: string;
}

export type IInputFormMainProps = Omit<IInputFormProps, 'input'> & IInputProps

export type IInputForm = Pick<IBlock<IInputFormProps>, 'attributes'> & {
    props: IInputFormMainProps;
    attributesInput?: Record<string, string>
};
