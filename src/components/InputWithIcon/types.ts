import { IBlock } from '@modules'
import { IInputProps, Input } from '../Input'

export interface IInputWithIconProps {
    input: Input
    icon: string
}

export type IInputWithIconMainProps = Omit<IInputWithIconProps, 'input'> & IInputProps

export type IInputWithIcon = Pick<IBlock<IInputWithIconProps>, 'attributes'> & {
    props: IInputWithIconMainProps
    attributesInput?: Record<string, string>
};
