function generateKey(args: any[]) {
    return args.map((arg) => `${typeof (arg)}<${String(arg)}>`).join(',')
}

export function memoize<A extends any[], R>(fn: (...args: A) => R):(...args: A) => R {
    const cache: Record<string, any> = {}

    return function func(...args: any) {
        const key = generateKey(args)
        let result = cache[key]
        if (typeof result === 'undefined') {
            result = fn(...args)
            cache[key] = result
        }
        return result
    }
}
