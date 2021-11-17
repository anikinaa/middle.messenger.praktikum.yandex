import { queryStringify } from './utils'
import { IFetchOptions, IFetchMethodsOptions, METHODS_FETCH } from './types'
import { Router } from '../Router'
import { setAuthOff } from '../../utils/localStorage'

export class Fetch {
    baseApi: string

    constructor(baseApi: string = '', host:string = 'https://ya-praktikum.tech/api/v2') {
        this.baseApi = `${host}${baseApi}`
    }

    get<T>(url: string, options: IFetchMethodsOptions<T> = {}): Promise<XMLHttpRequest> {
        return this.requestFabric<T>(url, METHODS_FETCH.GET, options)
    }

    post<T>(url: string, options: IFetchMethodsOptions<T> = {}): Promise<XMLHttpRequest> {
        return this.requestFabric<T>(url, METHODS_FETCH.POST, options)
    }

    put<T>(url: string, options: IFetchMethodsOptions<T> = {}): Promise<XMLHttpRequest> {
        return this.requestFabric<T>(url, METHODS_FETCH.PUT, options)
    }

    delete<T>(url: string, options: IFetchMethodsOptions<T> = {}): Promise<XMLHttpRequest> {
        return this.requestFabric<T>(url, METHODS_FETCH.DELETE, options)
    }

    private requestFabric<T>(url:string, method: METHODS_FETCH, options: IFetchMethodsOptions<T>) {
        const {
            data, headers, timeout, formData,
        } = options
        return this.request<T>(url, {
            data, headers, method, formData,
        }, timeout)
    }

    /* eslint-disable-next-line class-methods-use-this */
    private request<T>(
        url: string,
        options: IFetchOptions<T>,
        timeout = 5000,
    ): Promise<XMLHttpRequest> {
        const {
            method,
            data,
            formData = false,
            headers = {
                'Content-Type': 'application/json',
            },
        } = options
        let newUrl = `${this.baseApi}${url}`
        if (method === METHODS_FETCH.GET && data) {
            newUrl += queryStringify<T>(data)
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true
            xhr.open(method, newUrl, true)
            xhr.timeout = timeout

            Object.entries(headers).forEach(([key, val]) => {
                xhr.setRequestHeader(key, val)
            })

            xhr.onload = () => {
                if (xhr.status === 401) {
                    setAuthOff()
                    Router.go('/')
                }
                resolve(xhr)
            }
            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            if (method === METHODS_FETCH.GET || !data) {
                xhr.send()
            } else if (formData) {
                xhr.send(data as unknown as FormData)
            } else {
                xhr.send(JSON.stringify(data))
            }
        })
    }
}
