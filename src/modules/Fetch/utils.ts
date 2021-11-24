export function queryStringify<T = {}>(data:T) {
    return Object
        .entries(data)
        .reduce((acc, [key, val], i) => `${acc}${i === 0 ? '?' : '&'}${key}=${val}`, '')
}
