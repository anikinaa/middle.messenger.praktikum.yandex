import { expect } from 'chai'
import { Template } from './Template'

describe('Template - шаблонизатор', () => {
    let cleanup: Function

    function getHtmlTemplate(_template:string, context = {}) {
        const template = new Template(_template)
        const frag = template.compile(context)
        const wrap = document.createElement('div')
        wrap.appendChild(frag.cloneNode(true))
        return wrap.innerHTML
    }

    beforeEach(() => {
        cleanup = require('jsdom-global')('<html><body></body></html>') as Function
    })

    it('Пустой элемент', async () => {
        const html = getHtmlTemplate('<div></div>')
        expect(html).to.equal('<div></div>')
    })

    it('Простой контекст', async () => {
        const html = getHtmlTemplate('<div>{{a}}</div>', {
            a: 'test',
        })
        expect(html).to.equal('<div>test</div>')
    })

    it('Вложенный контекст', async () => {
        const html = getHtmlTemplate('<div>{{a.b}}</div>', {
            a: {
                b: 'test',
            },
        })
        expect(html).to.equal('<div>test</div>')
    })

    it('Неизвестный контекст', async () => {
        const html = getHtmlTemplate('<div>{{a}}</div>', {})
        expect(html).to.equal('<div></div>')
    })

    it('Условие отображения - показать', async () => {
        const html = getHtmlTemplate('<div>{{@if show}}<span></span>{{/if}}</div>', {
            show: true,
        })
        expect(html).to.equal('<div><span></span></div>')
    })

    it('Условие отображения - скрыть при undefined', async () => {
        const html = getHtmlTemplate('<div>{{@if show}}<span></span>{{/if}}</div>')
        expect(html).to.equal('<div></div>')
    })

    it('Условие отображения - скрыть при false', async () => {
        const html = getHtmlTemplate('<div>{{@if show}}<span></span>{{/if}}</div>', {
            show: false,
        })
        expect(html).to.equal('<div></div>')
    })

    after(() => {
        window.close()
        cleanup()
    })
})
