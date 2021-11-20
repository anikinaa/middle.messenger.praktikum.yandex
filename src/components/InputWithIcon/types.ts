import { IInputProps, Input } from '../Input'
import { IBlock } from '../../modules'

export interface IInputWithIconProps {
    input: Input
    icon: string
}

export type IInputWithIconMainProps = Omit<IInputWithIconProps, 'input'> & IInputProps

export type IInputWithIcon = Pick<IBlock<IInputWithIconProps>, 'attributes'> & {
    props: IInputWithIconMainProps
    attributesInput?: Record<string, string>
};
