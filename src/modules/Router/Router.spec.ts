/* eslint-disable max-classes-per-file */
import { expect } from 'chai'
import { JSDOM } from 'jsdom'
import { Router } from './Router'
import { Block } from '../Block'

/* eslint-disable no-useless-constructor,no-use-before-define */
class PageStart extends Block {
    static exact: boolean = true

    static pathname: string = '/'

    static title: string = 'Start'

    static privatePage: boolean = false

    constructor() {
        super()
    }
}

class Page1 extends Block {
    static exact: boolean = true

    static pathname: string = '/page-1'

    static title: string = 'Page 1'

    static privatePage: boolean = false

    constructor() {
        super()
    }
}

class Page2 extends Block {
    static exact: boolean = true

    static pathname: string = '/page-2'

    static title: string = 'Page 2'

    static privatePage: boolean = false

    constructor() {
        super()
    }
}
/* eslint-enable no-useless-constructor,no-use-before-define */

/* eslint-disable no-proto,no-plusplus */
function firePopstateOnRoute(window: any): void {
    const { history } = window
    const originalBack = history.back
    const originalPushState = history.pushState
    const originalForwards = history.forward

    history._length = 1
    history._stack = [window.location.pathname]
    Object.defineProperty(history, 'length', {
        get() {
            return this._length
        },
        set() {
        },
    });

    (history as unknown as { __proto__: History }).__proto__.pushState = function patchedBack(this: History, ...args: Parameters<History['back']>): void {
        originalPushState.apply(this, args)
        history._length++
        // @ts-ignore
        const path = args[2]
        history._stack.push(path)
        window.dispatchEvent(new window.PopStateEvent('popstate'))
    };

    (history as unknown as { __proto__: History }).__proto__.back = function patchedBack(this: History, ...args: Parameters<History['back']>): void {
        originalBack.apply(this, args)

        const event = new window.PopStateEvent('popstate')
        const path = history._stack[--history._length - 1]

        if (path) {
            Object.defineProperty(event, 'currentTarget', {
                writable: false,
                value: {
                    location: {
                        pathname: path,
                    },
                },
            })
        }

        window.dispatchEvent(event)
    };

    (history as unknown as { __proto__: History }).__proto__.forward = function patchedForward(this: History, ...args: Parameters<History['forward']>): void {
        originalForwards.apply(this, args)

        const path = history._stack[++history._length - 1]
        const event = new window.PopStateEvent('popstate')

        if (path) {
            Object.defineProperty(event, 'currentTarget', {
                writable: false,
                value: {
                    location: {
                        pathname: path,
                    },
                },
            })
        }
        window.dispatchEvent(event)
    }
}
/* eslint-enable no-proto,no-plusplus */

describe('Router', () => {
    let router: Router

    beforeEach(() => {
        Router.__instance = null
        // @ts-ignore
        const { window } = new JSDOM('<!DOCTYPE html><head></head><p>Fake document</p>', {
            url: 'http://localhost/',
        })
        firePopstateOnRoute(window)
        // @ts-ignore
        global.document = window.document
        // @ts-ignore
        global.window = window

        router = new Router('#root')
        router.use(PageStart).use(Page1).use(Page2).start()
    })

    it('?????????????????? ????????????????', async () => {
        expect({
            title: document.title,
            pathname: window.location.pathname,
            length: window.history.length,
        }).to.deep.equal({
            title: PageStart.title,
            pathname: PageStart.pathname,
            length: 1,
        })
    })

    it('?????????????? ???? ????????????????', async () => {
        router.go(Page1.pathname)
        expect({
            title: document.title,
            pathname: window.location.pathname,
            length: window.history.length,
        }).to.deep.equal({
            title: Page1.title,
            pathname: Page1.pathname,
            length: 2,
        })
    })

    it('?????????????? ???? ???????????????? 2', async () => {
        router.go(Page1.pathname)
        router.go(Page2.pathname)
        expect({
            title: document.title,
            pathname: window.location.pathname,
            length: window.history.length,
        }).to.deep.equal({
            title: Page2.title,
            pathname: Page2.pathname,
            length: 3,
        })
    })

    it('??????????', () => {
        router.go(Page1.pathname)
        router.go(Page2.pathname)
        router.back()

        expect({
            title: document.title,
            length: window.history.length,
        }).to.deep.equal({
            title: Page1.title,
            length: 2,
        })
    })

    it('????????????', () => {
        router.go(Page1.pathname)
        router.go(Page2.pathname)
        router.back()
        router.forward()

        expect({
            title: document.title,
            length: window.history.length,
        }).to.deep.equal({
            title: Page2.title,
            length: 3,
        })
    })

    afterEach(() => {
        window.close()
    })
})
/* eslint-enable  max-classes-per-file */
