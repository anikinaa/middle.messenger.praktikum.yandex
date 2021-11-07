export function cloneDeep<T extends object = object>(obj: T): T {
    if (isArray(obj)) {
        return obj.map(cloneDeep) as T
    } else if (isPlainObject(obj)) {
        const result: Record<string, T> = {}
        for (const [key, value] of Object.entries(obj)) {
            result[key] = cloneDeep(value as T)
        }
        return result as T
    } else {
        return obj as T
    }
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}
