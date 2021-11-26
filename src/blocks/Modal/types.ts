import { Card, ICardProps } from '../../components/Card'
import { IBlock } from '../../modules/Block'

export type IModalProps = {
    card: Card
}

export type IModal = Omit<IBlock<ICardProps>, 'template' | 'events' | 'tagName'> & {
    props: ICardProps
    onClose?: () => void
}
