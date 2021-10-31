import { Block, IBlock } from '../../modules'
import { Button } from '../../components'

export interface IFormProps {
    fields: Block<any>[] | Block<any>;
    error?: string;
    submit: Button;
    action?: Block<any>[] | Block<any>;
}

export type IForm = Omit<IBlock<IFormProps>, 'tagName' | 'template'>;
