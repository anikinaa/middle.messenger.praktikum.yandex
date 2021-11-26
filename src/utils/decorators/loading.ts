import { AsyncStore } from '../../modules/AsyncStore'

// @ts-ignore
export function loading(t, p, descriptor: TypedPropertyDescriptor<any>):
    TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function fn(this: AsyncStore) {
        // eslint-disable-next-line prefer-rest-params
        const fnArg = arguments
        return new Promise((resolve, reject) => {
            if (this.isLoading) {
                return
            }
            this.onLoading()
            // eslint-disable-next-line prefer-rest-params
            originalMethod.apply(this, fnArg)
                .then(resolve)
                .catch(reject)
                .finally(() => this.offLoading())
        })
    }
    return descriptor
}
