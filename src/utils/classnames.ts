type ICondition = Record<string, boolean | undefined | null>

export function classNames(baseClass: string, condition: ICondition): string {
    return Object.entries(condition)
        .reduce((acc, [className, flag]) => (flag ? `${acc} ${className}` : acc), baseClass)
}
