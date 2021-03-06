export function getPropObj(obj: Record<string, any>, path?:string): any {
    if (!path || path.length === 0) {
        return obj
    }
    if (!/^[^\\.]\w*(\.\w)*$/.test(path)) {
        throw new Error('неверный формат')
    }
    const keys: string[] = path.split('.')
    let result = obj

    // eslint-disable-next-line no-restricted-syntax
    for (const p of keys) {
        if (Object.prototype.hasOwnProperty.call(result, p)) {
            result = result[p]
        } else {
            return {}
        }
    }

    return result
}
