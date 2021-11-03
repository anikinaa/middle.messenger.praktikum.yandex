import { Block } from '../Block'
import {Route} from './Route'

type IBlockClass = { new(): Block<any>; }
export class Router{
    static __instance: Router | null = null
    routes: Route<any>[] | null = null
    private _currentRoute: any
    history: any
    private readonly _rootQuery: null | any = null

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: IBlockClass) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes!.push(route);
        return this
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back()
    }
    forward() {
        this.history.forward()
    }

    getRoute(pathname:string) {
        return this.routes!.find(route => route.match(pathname));
    }
}