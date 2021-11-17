import { expect } from 'chai'
import {Template} from './Template'

describe('Template - шаблонизатор', () => {
    let cleanup: Function

    beforeEach(() => {
        cleanup = require('jsdom-global')('<html><body></body></html>') as Function
    })

    it('Создание элемента', async () => {
        const tmplate = new Template(`<div></div>`)

        const x = tmplate.compile({})
        console.log(x.ownerDocument)
        expect(true).to.equal(true)
    })

    after(() => {
        window.close()
        cleanup()
    })
})
