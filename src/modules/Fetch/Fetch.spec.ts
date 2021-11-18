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

    async function createFetch(method: 'get' | 'post' | 'put' | 'delete', statusServer = 200) {
        const server = MockXMLHttpRequest.newServer({
            [method]: ['/url', {
                status: statusServer,
                headers: { 'Content-Type': 'application/json' },
                body: '{ "message": "Success!" }',
            }],
        }).install()

        const fetch = new Fetch('', '')
        const xhr = await fetch[method]('/url')
        const { status } = xhr
        const { message } = JSON.parse(xhr.response)
        return { message, server, status }
    }

    it('GET', async () => {
        const { message, server } = await createFetch('get')
        expect(message).to.equal('Success!')
        server.remove()
    })

    it('POST', async () => {
        const { message, server } = await createFetch('post')
        expect(message).to.equal('Success!')
        server.remove()
    })

    it('PUT', async () => {
        const { message, server } = await createFetch('put')
        expect(message).to.equal('Success!')
        server.remove()
    })

    it('DELETE', async () => {
        const { message, server } = await createFetch('delete')
        expect(message).to.equal('Success!')
        server.remove()
    })

    it('xhr status', async () => {
        const { status, server } = await createFetch('get', 404)
        expect(status).to.equal(404)
        server.remove()
    })

    it('401 redirect', async () => {
        // eslint-disable-next-line no-new
        new Router('')

        const server = MockXMLHttpRequest.newServer({
            get: ['/auth', {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
                body: '{ "message": "Success!" }',
            }],
        }).install()

        const fetch = new Fetch('', '')
        await fetch.get('/auth')
        expect(window.location.pathname).to.equal('/')
        server.remove()
    })

    it('timeout', async () => {
        const server = MockXMLHttpRequest.newServer({
            get: ['/url', {
                headers: { 'Content-Type': 'application/json' },
                body: '{ "message": "Success!" }',
            }],
        }).install()

        const fetch = new Fetch('', '')
        try {
            await fetch.get('/')
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
