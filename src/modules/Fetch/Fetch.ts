import { queryStringify } from './utils'
import { IFetchOptions, IFetchMethodsOptions, METHODS_FETCH } from './types'

export class HTTPTransport<D extends object = object> {
    get(url: string, options: IFetchMethodsOptions<D> = {}): Promise<XMLHttpRequest> {
        return this.requestFabric(url, METHODS_FETCH.GET, options)
    }

    post(url: string, options: IFetchMethodsOptions<D> = {}): Promise<XMLHttpRequest> {
        return this.requestFabric(url, METHODS_FETCH.POST, options)
    }

    put(url: string, options: IFetchMethodsOptions<D> = {}): Promise<XMLHttpRequest> {
        return this.requestFabric(url, METHODS_FETCH.PUT, options)
    }

    delete(url: string, options: IFetchMethodsOptions<D> = {}): Promise<XMLHttpRequest> {
        return this.requestFabric(url, METHODS_FETCH.DELETE, options)
    }

    private requestFabric(url:string, method: METHODS_FETCH, options: IFetchMethodsOptions<D>) {
        const { data, headers, timeout } = options
        return this.request(url, { data, headers, method }, timeout)
    }

    /* eslint-disable class-methods-use-this */
    private request(
        url: string,
        options: IFetchOptions<D>,
        timeout = 5000,
    ): Promise<XMLHttpRequest> {
        const { method, data, headers = [] } = options
        let newUrl = url
        if (method === METHODS_FETCH.GET && data) {
            newUrl += queryStringify<D>(data)
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, newUrl)
            xhr.timeout = timeout

            Object.entries(headers).forEach(([key, val]) => {
                xhr.setRequestHeader(key, val)
            })

            xhr.onload = () => {
                resolve(xhr)
            }
            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            if (method === METHODS_FETCH.GET || !data) {
                xhr.send()
            } else {
                xhr.send(JSON.stringify(data))
            }
        })
    }
}
