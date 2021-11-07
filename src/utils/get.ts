
export function get(obj: Record<string, any>, path:string): any {
    if ( !/^[^\.]\w*(\.\w)*$/.test(path)) {
        throw 'неверный формат'
    }
    const keys: string[] = path.split(".")
    let result = obj

    for (let p of keys) {
        if (result.hasOwnProperty(p)) {
            result = result[p]
        } else {
            return {}
        }
    }

    return result
}
