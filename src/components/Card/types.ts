import { Block, IBlock } from '../../modules/Block'

export interface ICardProps {
    header: string
    body: Block<any> | Block<any>[]
}

export type ICard = Omit<IBlock<ICardProps>, 'template'> & {
    props: ICardProps
};
