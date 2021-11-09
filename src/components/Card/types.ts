import { IBlock } from '../../modules'

export interface ICardProps<T> {
    header: string;
    body: T
}

export type ICard<T> = Omit<IBlock<ICardProps<T>>, 'template'> & {
    props: ICardProps<T>
};
