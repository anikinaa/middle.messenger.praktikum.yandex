import {AsyncStore} from '../modules'

// @ts-ignore
export function errorStateCatch(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: AsyncStore) {
        originalMethod.apply(this, arguments).catch(() => {
            this.setError('Ошибка, попробуйте еще раз')
        })
    }
    return descriptor;
}

// @ts-ignore
export function loading(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: AsyncStore) {
        const fnArg = arguments
        return new Promise((resolve, reject) => {
            if (this.isLoading) {
                return
            }
            this.onLoading()
            originalMethod.apply(this, fnArg)
                .then(resolve)
                .catch(reject)
                .finally(() => this.offLoading())
        })
    }
    return descriptor;
}

// @ts-ignore
export function errorCatch(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
        originalMethod.catch(() => {
            throw new Error('Ошибка, попробуйте еще раз')
        })
    }
    return descriptor
}