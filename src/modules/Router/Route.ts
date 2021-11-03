import { Block } from '../Block'
import { renderDOM } from '../../utils/renderDOM'

type BlockClass<T extends object> = { new(): Block<T>; }

export class Route<T extends object>{
    private _pathname: string;
    private readonly _blockClass: BlockClass<T>;
    private _block: any;
    // @ts-ignore
    private _props: any;

    constructor(pathname: string, view: BlockClass<T>, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
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
            renderDOM(this._block)
            return;
        }

        this._block.show();
    }
}