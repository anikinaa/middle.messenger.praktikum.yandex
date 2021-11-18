const { expect } = require('chai');
const { Router } = require('../Router');
const { Block } = require('../Block');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class PageStart extends Block {
    static exact: boolean = true
    static pathname: string = '/'
    static title: string = 'Start'
    static privatePage: boolean = false

    constructor() {
        super()
    }

    static open() {
        Router.go(Page2.pathname)
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

    static open() {
        Router.go(Page2.pathname)
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

    static open() {
        Router.go(Page1.pathname)
    }
}

// let length = 0
// let stack = []

function firePopstateOnRoute(window: any): void {
    const { history } = window;
    const originalBack = history.back;
    const originalPushState = history.pushState;
    const originalForwards = history.forward;

    history._length = 1
    history._stack = [window.location.pathname]
    Object.defineProperty(history, "length", {
        // only returns odd die sides
        get: function () {
            return this._length
        },
        set: function () {
        },
    });

    // @ts-ignore
    // (history as unknown as {__proto__: History})['__proto__'].length = () => 0;

    (history as unknown as { __proto__: History })['__proto__'].pushState = function patchedBack(this: History, ...args: Parameters<History['back']>): void {
        originalPushState.apply(this, args);
        history._length++
        // @ts-ignore
        const path = args[2]
        history._stack.push(path)
        window.dispatchEvent(new window.PopStateEvent('popstate'));
    };

    (history as unknown as { __proto__: History })['__proto__'].back = function patchedBack(this: History, ...args: Parameters<History['back']>): void {
        originalBack.apply(this, args);

        const event = new window.PopStateEvent('popstate');
        const path = history._stack[--history._length - 1]

        if (path) {
            Object.defineProperty(event, 'currentTarget', {
                writable: false,
                value: {
                    location: {
                        pathname: path,
                    },
                },
            });
        }

        window.dispatchEvent(event);
    };


    (history as unknown as { __proto__: History }).__proto__.forward = function patchedForward(this: History, ...args: Parameters<History['forward']>): void {
        originalForwards.apply(this, args);

        const path = history._stack[++history._length - 1]
        const event = new window.PopStateEvent('popstate');

        if (path) {
            Object.defineProperty(event, 'currentTarget', {
                writable: false,
                value: {
                    location: {
                        pathname: path,
                    },
                },
            });
        }
        window.dispatchEvent(event);
    };
}


describe('Router', () => {
    // let cleanup: Function
    let router: typeof Router


    beforeEach(() => {
        Router.__instance = null
        // @ts-ignore
        const { window } = new JSDOM(`<!DOCTYPE html><head></head><p>Fake document</p>`, {
            url: "http://localhost/",
        });
        firePopstateOnRoute(window)
        // @ts-ignore
        global.document = window.document;
        // @ts-ignore
        global.window = window;

        router = new Router('#root')
        router.use(PageStart).use(Page1).use(Page2).start()
    })

    it('Стартовая страница', async () => {
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

    it('Переход на страницу', async () => {
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

    it('Переход на страницу 2', async () => {
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

    it('Назад', () => {
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

    it('Вперед', () => {
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

    after(() => {
        window.close()
    })
})
