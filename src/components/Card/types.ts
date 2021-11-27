import { Block, IBlock } from '@modules'

export interface ICardProps {
    header: string
    body: Block<any> | Block<any>[]
}

export type ICard = Omit<IBlock<ICardProps>, 'template'> & {
    props: ICardProps
};
