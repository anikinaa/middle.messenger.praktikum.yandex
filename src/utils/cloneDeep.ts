export type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isArray(value: unknown): value is [] {
    return Array.isArray(value)
}

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]'
}

export function cloneDeep<T extends object = object>(obj: T): T {
    if (isArray(obj)) {
        return obj.map(cloneDeep) as T
    } if (isPlainObject(obj)) {
        const result: Record<string, T> = {}

        Object.entries(obj).forEach(([key, value]) => {
            result[key] = cloneDeep(value as T)
        })

        return result as T
    }
    return obj as T
}
