import { Route } from './Route'
import { IPageClass } from './types'

export class Router {
    static __instance: Router | null = null

    private routes: Route[] = []

    private _currentRoute: Route[] = []

    private history: History = window.history

    private readonly _rootQuery: string | null = null

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance
        }
        this._rootQuery = rootQuery
        Router.__instance = this
    }

    use(block: IPageClass) {
        const { pathname } = block
        const { title } = block
        const { privatePage } = block
        const { exact } = block
        const { redirect } = block
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery!,
            title,
            privatePage,
            exact,
            redirect,
        })
        this.routes!.push(route)
        return this
    }

    get isAuth() {
        const isAuth = localStorage.getItem('isAuth')
        return Boolean(isAuth && JSON.parse(isAuth))
    }

    start() {
        const pages = this.getRoutes(window.location.pathname)
        if (pages.length === 0) {
            window.location.pathname = '/404'
        } else {
            pages.forEach((page) => {
                if (page.redirect) {
                    window.location.pathname = page.redirect
                }
            })
        }
        console.log(window.location.pathname)
        window.onpopstate = (event: PopStateEvent) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname)
        }
        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const routes = this.getRoutes(pathname)

        if (routes.length === 0) {
            return
        }

        for (const route of routes) {
            if (route.privatePage && !this.isAuth) {
                this.go('/')
                return
            } if (!route.privatePage && this.isAuth) {
                this.go('/messenger')
                return
            }
        }

        const leaveRoutes = this._currentRoute.filter((r) => !routes.includes(r))
        leaveRoutes.forEach((route) => route.leave())
        this._currentRoute = leaveRoutes
        routes.forEach((route) => {
            route.render()
        })
        this._currentRoute = routes
    }

    static go(pathname: string) {
        Router.__instance?.go(pathname)
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoutes(pathname:string) {
        const routes = []
        for (const route of this.routes) {
            if (route.exact && route.isExact(pathname)) {
                return [route]
            }
            if (!route.exact && route.match(pathname)) {
                routes.push(route)
            }
        }
        return routes
    }
}
