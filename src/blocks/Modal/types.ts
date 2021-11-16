import { Card, ICardProps } from '../../components'
import { IBlock } from '../../modules'

export type IModalProps = {
    card: Card
}

export type IModal = Omit<IBlock<ICardProps>, 'template' | 'events' | 'tagName'> & {
    props: ICardProps,
    onClose?: () => void,
}
