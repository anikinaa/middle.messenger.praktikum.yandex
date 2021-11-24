import { IBlockClass } from '../Block'

export type IRouterProps = {
    rootQuery: string
    title: string
    privatePage: boolean
    exact: boolean
    redirect?: string
}

export type IPageClass = IBlockClass & {
    title: string
    pathname: string
    privatePage: boolean
    exact: boolean
    redirect?: string
}
