import { expect } from 'chai'
import { Button } from './Button'
import { IButton } from './types'

describe('Button - компонент кнопки', () => {
    let cleanup: Function

    beforeEach(() => {
        cleanup = require('jsdom-global')('<html><body></body></html>') as Function
    })

    function createBtn(options?: Partial<IButton>): Button {
        return new Button({
            props: {
                name: 'btn',
            },
            ...options,
        })
    }

    it('Создание элемента', async () => {
        const btn = createBtn()
        expect(btn.element?.outerHTML).to.equal('<button data-element="button" '
            + 'class="button" type="button"><span>btn</span></button>')
    })

    it('Изменение пропсов', async () => {
        const btn = createBtn()
        btn.setProps({
            name: 'name',
        })
        expect(btn.element?.outerHTML).to.equal('<button data-element="button" '
            + 'class="button" type="button"><span>name</span></button>')
    })

    it('Создание элемента с аттрибутом', async () => {
        const btn = createBtn({
            attributes: {
                class: 'test-attr',
            },
        })
        expect(btn.element?.outerHTML).to.equal('<button data-element="button" '
            + 'class="button test-attr" type="button"><span>btn</span></button>')
    })

    it('hide', async () => {
        const btn = createBtn()
        btn.hide()
        expect(btn.element?.outerHTML).to.equal('<button data-element="button" '
            + 'class="button hidden" type="button"><span>btn</span></button>')
    })

    it('show', async () => {
        const btn = createBtn()
        btn.hide()
        btn.show()
        expect(btn.element?.outerHTML).to.equal('<button data-element="button" '
            + 'class="button" type="button"><span>btn</span></button>')
    })

    it('Событие клика', async () => {
        let click = false
        const btn = createBtn({
            events: {
                click: () => {
                    click = true
                },
            },
        })
        btn.element?.click()
        expect(click).to.equal(true)
    })

    after(() => {
        window.close()
        cleanup()
    })

})
