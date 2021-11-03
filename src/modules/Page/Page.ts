import { Block, IBlock } from '../Block'

interface IPage<T extends object> {
    propsBlock: IBlock<T>
    url: string
    title: string
}

export class Page<T extends object = {}> extends Block<T>{
    url: string | null = null
    title: string | null = null

    constructor({ propsBlock, url, title }: IPage<T>) {
        super(propsBlock)
        this.url = url
        this.title = title
    }

}