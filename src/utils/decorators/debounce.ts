// @ts-ignore
export function debounce(t, p, descriptor: TypedPropertyDescriptor<any>):
    TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function fn() {
        let isStop = false
        if (isStop) {
            return
        }
        // eslint-disable-next-line prefer-rest-params
        originalMethod.apply(this, arguments)
        isStop = true
        setTimeout(() => {
            isStop = false
        }, 300)
    }
    return descriptor
}
