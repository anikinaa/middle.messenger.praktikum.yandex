import { IBlockClass } from '../Block'
import {Route} from './Route'

type IPageClass = IBlockClass & {
    title: string
    pathname: string
    privatePage: boolean
    exact: boolean
}

export class Router{
    static __instance: Router | null = null

    private routes: Route[] = []
    private _currentRoute: Route[] = []
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
        const exact: boolean = block.exact;
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery!,
            title,
            privatePage,
            exact
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
        let routes = this.getRoutes(pathname);

        if (routes.length === 0) {
            return
        }

        for (let route of routes) {
            if (route.privatePage && !this.isAuth) {
                this.go('/')
                return
            } else if (!route.privatePage && this.isAuth) {
                this.go('/messenger')
                return
            }
        }

        this._currentRoute.forEach(route => route.leave() )
        this._currentRoute = []

        routes.forEach(route => route.render())
        this._currentRoute = routes
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

    getRoutes(pathname:string) {
        let routes = []
        for (let route of this.routes) {
            if (route.exact && route.isExact(pathname)) {
                return [route]
            }
            if (!route.exact && route.match(pathname)) {
                routes.push(route)
            }
        }
        return routes;
    }
}
