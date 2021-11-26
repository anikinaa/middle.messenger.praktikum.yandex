import { Block, IBlock } from '../../modules/Block'
import { Button } from '../../components/Button'
import { InputForm } from '../../components/InputForm'

export interface IFormProps {
    fields: Block<any>[] | Block<any> | InputForm[]
    error?: string | null
    submit: Button
    action?: Block<any>[] | Block<any>
}

export type IForm = Omit<IBlock<IFormProps>, 'tagName' | 'template'>;
