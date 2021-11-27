import {Router, routes} from "@modules";

// @ts-ignore
export function errorCatch(target, propertyKey, descriptor: TypedPropertyDescriptor<any>):
    TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function fn(this: any) {
        // eslint-disable-next-line prefer-rest-params
        originalMethod.apply(this, arguments).catch((e: Error) => {
            // eslint-disable-next-line no-console
            console.error(e)
            Router.go(routes.internalServerError)
        })
    }
    return descriptor
}
