export function joinClassName(
    attributes: Record<string, string> = {},
    className: string,
): string {
    const instClass = attributes?.class
    return instClass ? `${className} ${instClass}` : className
}

export function getDefaultType(
    attributes: Record<string, string> = {},
    type: string,
): string {
    const instType = attributes?.type
    return instType ?? type
}
