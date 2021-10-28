import { IBlock } from '../../modules'

// export interface IInput {
//     attributes?: IAttributes
//     validity?: string
// }

export type IInput = Pick<IBlock<{}>, 'attributes'>;
