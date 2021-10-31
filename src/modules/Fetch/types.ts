export enum METHODS_FETCH {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface IFetchOptions<T> {
    method: METHODS_FETCH;
    data?: T;
    headers?: Record<string, string>
}

export interface IFetchMethodsOptions<T> {
    data?: T;
    headers?: Record<string, string>;
    timeout?: number
}
