import { renderDOM } from '@utils/renderDOM'
import { Block, IBlockClass } from '../Block'
import { IRouterProps } from './types'

export class Route {
    private _pathname: string;

    private readonly _blockClass: IBlockClass;

    private _block: Block | null = null;

    private _props: IRouterProps | null = null;

    constructor(pathname: string, view: IBlockClass, props: IRouterProps) {
        this._pathname = pathname
        this._blockClass = view
        this._props = props
    }

    get pathname() {
        return this._pathname
    }

    get redirect() {
        return this._props!.redirect
    }

    get exact() {
        return this._props!.exact
    }

    get privatePage() {
        return this._props!.privatePage
    }

    get rootQuery() {
        return this._props!.rootQuery
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname
            this.render()
        }
    }

    leave() {
        if (this._block) {
            this._block.leave()
            this._block = null
        }
    }

    match(pathname: string): boolean {
        const match = pathname?.match(this._pathname)
        if (match) {
            return match.index === 0
        }
        return false
    }

    isExact(pathname: string): boolean {
        return pathname === this._pathname
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass()
            this.setTitle()
            renderDOM(this._block, this.rootQuery)
            return
        }

        this._block.show()
        this.setTitle()
    }

    setTitle() {
        // @ts-ignore
        document.title = this._props!.title
    }
}
