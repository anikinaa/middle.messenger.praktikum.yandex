import { Block, IBlock } from '../../modules'
import { Button, InputForm } from '../../components'

export interface IFormProps {
    fields: Block<any>[] | Block<any> | InputForm[];
    error?: string | null;
    submit: Button;
    action?: Block<any>[] | Block<any>;
}

export type IForm = Omit<IBlock<IFormProps>, 'tagName' | 'template'>;
