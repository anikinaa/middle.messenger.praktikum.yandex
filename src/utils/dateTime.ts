function getDateInstance(date: string | Date): Date {
    return typeof date === 'string' ? new Date(date) : date
}

export function getDate(date: string | Date):string {
    const dateInstance = getDateInstance(date)
    const dateString = dateInstance.toLocaleDateString()
    if (new Date().toLocaleDateString() === dateString) {
        return 'Сегодня'
    }
    return dateString
}

export function getTime(date: string | Date): string {
    const dateInstance = getDateInstance(date)
    return dateInstance.toLocaleTimeString().slice(0, -3)
}

export function getDateTime(dateTime: string | Date):string {
    const dateInstance = getDateInstance(dateTime)
    const date = getDate(dateInstance)
    const time = getTime(dateInstance)

    return `${date} ${time}`
}
