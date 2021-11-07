import { Block, IBlockClass } from '../Block'
import { renderDOM } from '../../utils/renderDOM'


export class Route{
    private _pathname: string;
    private readonly _blockClass: IBlockClass;
    private _block: Block | null = null;
    private _props: {
        rootQuery: string
        title: string
        privatePage: boolean
    } | null = null;

    constructor(pathname: string, view: IBlockClass, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
    }

    get privatePage() {
        return this._props!.privatePage
    }

    get rootQuery() {
        return this._props!.rootQuery
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            this.setTitle()
            renderDOM(this._block, this.rootQuery)
            return;
        }

        this._block.show();
        this.setTitle()
    }

    setTitle () {
        // @ts-ignore
        document.title = this._props!.title
    }
}
