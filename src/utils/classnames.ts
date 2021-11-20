export function classNames(baseClass: string, data: Record<string, boolean | undefined | null>): string {
    return Object.entries(data).reduce((acc, [className, flag]) => flag ? `${acc} ${className}` : acc, baseClass)
}
