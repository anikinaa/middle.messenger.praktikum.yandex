import { expect } from 'chai'
import * as MockXMLHttpRequest from 'mock-xmlhttprequest'
import { Fetch } from './Fetch'
import { Router } from '../Router'

describe('Fetch - работа с запросами', () => {
    let cleanup: Function

    beforeEach(() => {
        // eslint-disable-next-line global-require
        cleanup = require('jsdom-global')('<html><body></body></html>', {
            url: 'http://localhost/page',
        }) as Function
    })

    function createServer(method: 'get' | 'post' | 'put' | 'delete', statusResponse = 200) {
        return MockXMLHttpRequest.newServer({
            [method]: ['/url', {
                status: statusResponse,
                headers: { 'Content-Type': 'application/json' },
                body: '{ "message": "Success!" }',
            }],
        }).install()
    }

    async function createServerFetch(method: 'get' | 'post' | 'put' | 'delete', statusResponse = 200) {
        const server = createServer(method, statusResponse)
        const fetch = new Fetch('', '')
        const { message } = await fetch[method]('/url')
        return { message, server }
    }

    it('GET', async () => {
        const { message, server } = await createServerFetch('get')
        expect(message).to.equal('Success!')
        server.remove()
    })

    it('POST', async () => {
        const { message, server } = await createServerFetch('post')
        expect(message).to.equal('Success!')
        server.remove()
    })

    it('PUT', async () => {
        const { message, server } = await createServerFetch('put')
        expect(message).to.equal('Success!')
        server.remove()
    })

    it('DELETE', async () => {
        const { message, server } = await createServerFetch('delete')
        expect(message).to.equal('Success!')
        server.remove()
    })

    it('xhr error', async () => {
        const server = await createServer('get', 404)
        try {
            await new Fetch('', '').get('/url')
            expect(false).to.equal(true)
        } catch (e) {
            expect(true).to.equal(true)
        } finally {
            server.remove()
        }
    })

    it('401 redirect', async () => {
        // eslint-disable-next-line no-new
        new Router('')
        const server = createServer('get', 401)
        try {
            await new Fetch('', '').get('/url')
            expect(window.location.pathname).to.equal('/')
        } catch (e) {
            expect(window.location.pathname).to.equal('/')
        } finally {
            server.remove()
        }
    })

    it('timeout', async () => {
        const server = createServer('get')

        const fetch = new Fetch('', '')
        try {
            await fetch.get('/')
            expect('success').to.equal('timeout')
        } catch ({ type }) {
            expect(type).to.equal('timeout')
        } finally {
            server.remove()
        }
    })

    afterEach(() => {
        Router.__instance = null
        window.close()
        cleanup()
    })
})
