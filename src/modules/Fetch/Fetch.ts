import { setAuthOff } from '@utils/localStorage'
import { Router, pathRoutes } from '../Router'
import { queryStringify } from './utils'
import { IFetchOptions, IFetchMethodsOptions, METHODS_FETCH } from './types'

export class Fetch {
    baseApi: string

    constructor(baseApi: string = '', host:string = 'https://ya-praktikum.tech/api/v2') {
        this.baseApi = `${host}${baseApi}`
    }

    get<T, U = unknown>(url: string, options: IFetchMethodsOptions<T> = {}): Promise<U> {
        return this.requestFabric<T, U>(url, METHODS_FETCH.GET, options)
    }

    post<T, U = unknown>(url: string, options: IFetchMethodsOptions<T> = {}): Promise<U> {
        return this.requestFabric<T, U>(url, METHODS_FETCH.POST, options)
    }

    put<T, U = unknown>(url: string, options: IFetchMethodsOptions<T> = {}): Promise<U> {
        return this.requestFabric<T, U>(url, METHODS_FETCH.PUT, options)
    }

    delete<T, U = unknown>(url: string, options: IFetchMethodsOptions<T> = {}): Promise<U> {
        return this.requestFabric<T, U>(url, METHODS_FETCH.DELETE, options)
    }

    private requestFabric<T, U>(
        url:string,
        method: METHODS_FETCH,
        options: IFetchMethodsOptions<T>,
    ) {
        const {
            data, headers, timeout, formData,
        } = options
        return this.request<T, U>(url, {
            data, headers, method, formData,
        }, timeout)
    }

    /* eslint-disable-next-line class-methods-use-this */
    private request<T, U>(
        url: string,
        options: IFetchOptions<T>,
        timeout = 5000,
    ): Promise<U> {
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

            if (!formData) {
                Object.entries(headers).forEach(([key, val]) => {
                    xhr.setRequestHeader(key, val)
                })
            }

            xhr.onload = () => {
                const { response, status } = xhr

                let responseData
                try {
                    responseData = JSON.parse(response)
                } catch (err) {
                    responseData = response
                }

                if (status === 200) {
                    resolve(responseData)
                } else {
                    if (status === 401) {
                        setAuthOff()
                        Router.go(pathRoutes.signIn)
                    }
                    reject(responseData)
                }
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
