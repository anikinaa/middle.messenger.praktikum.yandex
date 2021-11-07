import { IBlockClass } from '../Block'
import {Route} from './Route'

type IPageClass = IBlockClass & {
    title: string
    pathname: string
    privatePage: boolean
}

export class Router{
    static __instance: Router | null = null

    private routes: Route[] = []
    private _currentRoute: Route | null = null
    private history: History = window.history
    private readonly _rootQuery: string | null = null

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(block: IPageClass) {
        const pathname: string = block.pathname;
        const title: string = block.title;
        const privatePage: boolean = block.privatePage;
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
            title,
            privatePage
        });
        this.routes!.push(route);
        return this
    }

    get isAuth() {
        const isAuth = localStorage.getItem('isAuth')
        return  Boolean(isAuth && JSON.parse(isAuth))
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);

        if (!route) {
            return
        }

        if (route.privatePage && !this.isAuth) {
            this.go('/')
        } else if (!route.privatePage && this.isAuth) {
            this.go('/messenger')
        } else {
            if (this._currentRoute) {
                this._currentRoute.leave();
            }
            this._currentRoute = route;
            route.render();
        }
    }

    static go(pathname: string) {
        Router.__instance?.go(pathname)
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
