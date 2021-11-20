import { AsyncStore } from '../../modules'

// @ts-ignore
export function errorStateCatch(t, p, descriptor: TypedPropertyDescriptor<any>):
    TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function fn(this: AsyncStore) {
        this.resetError()
        // eslint-disable-next-line prefer-rest-params
        originalMethod.apply(this, arguments)
            .catch((error: unknown) => {
                this.setError(error)
            })
    }
    return descriptor
}
