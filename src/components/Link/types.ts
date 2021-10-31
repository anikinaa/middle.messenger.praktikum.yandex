import { IBlock } from '../../modules'

export interface ILinkProps {
    text: string;
}

export type ILink = Pick<IBlock<ILinkProps>, 'attributes' | 'events'> & {
    text: string;
    href: string;
};
