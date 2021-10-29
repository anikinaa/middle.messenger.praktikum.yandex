export function getObjectVal(
    obj: object,
    path: string,
    defaultValue?: unknown,
): unknown {
    const keys = path.split('.')

    let result = obj
    /* eslint-disable-next-line no-restricted-syntax */
    for (const key of keys) {
        // @ts-ignore
        result = result[key]

        if (result === undefined) {
            return defaultValue
        }
    }

    return result ?? defaultValue
}
