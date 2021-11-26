import { IBlock } from '../../modules/Block'

export type ILinkProps = {
    text: string
}

export type ILinkMainProps = ILinkProps & {
    href: string
}

export type ILink = Pick<IBlock<ILinkProps>, 'attributes' | 'events'> & {
    props: ILinkMainProps
};
