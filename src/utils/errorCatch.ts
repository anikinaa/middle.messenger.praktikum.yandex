
// @ts-ignore
export function errorCatch(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: any) {
        originalMethod.apply(this, arguments).catch(() => {
            throw new Error('')
        })
    }
    return descriptor;
}
