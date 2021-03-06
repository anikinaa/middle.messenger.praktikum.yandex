import { arrayLast } from '@utils/arrayLast'
import { Route } from './Route'
import { IPageClass } from './types'
import { pathRoutes } from '../../pathRoutes'

export class Router {
    static __instance: Router | null = null

    private routes: Route[] = []

    private _currentRoute: Route[] = []

    private history: History = window.history

    private readonly _rootQuery: string | null = null

    constructor(rootQuery: string = 'body') {
        if (Router.__instance) {
            return Router.__instance
        }
        this._rootQuery = rootQuery
        Router.__instance = this
    }

    use(block: IPageClass) {
        const { pathname, ...props } = block
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery!,
            ...props,
        })
        this.routes!.push(route)
        return this
    }

    static get isAuth() {
        const isAuth = localStorage.getItem('isAuth')
        return Boolean(isAuth && JSON.parse(isAuth))
    }

    start() {
        const pages = this.getRoutes(window.location.pathname)
        if (pages.length === 0) {
            this.go(pathRoutes.notFound)
            return
        }
        pages.forEach((page) => {
            if (page.redirect) {
                window.location.pathname = page.redirect
            }
        })

        window.onpopstate = (event: PopStateEvent) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname)
        }
        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const matchRoutes = this.getRoutes(pathname)

        if (matchRoutes.length === 0) {
            return
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const route of matchRoutes) {
            if (route.privatePage !== undefined) {
                if (route.privatePage && !Router.isAuth) {
                    this.go(pathRoutes.signIn)
                    return
                }
                if (!route.privatePage && Router.isAuth) {
                    this.go(pathRoutes.messenger)
                    return
                }
            }
        }

        const leaveRoutes = this._currentRoute.filter((r) => !matchRoutes.includes(r))
        leaveRoutes.forEach((route) => route.leave())
        this._currentRoute = leaveRoutes
        matchRoutes.forEach((route) => {
            route.render()
        })
        this._currentRoute = matchRoutes
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

        // eslint-disable-next-line no-restricted-syntax
        for (const route of this.routes) {
            if (route.exact && route.isExact(pathname)) {
                return [route]
            }
            if (!route.exact && route.match(pathname)) {
                routes.push(route)
            }
        }

        const targetRoute = arrayLast(routes)
        if (targetRoute?.pathname !== pathname) {
            return []
        }
        return routes
    }
}
