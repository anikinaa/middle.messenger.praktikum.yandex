function getDateInstance (date: string | Date): Date {
    return typeof date === 'string' ? new Date(date) : date
}

export function getDateTime(dateTime: string | Date):string {
    dateTime = getDateInstance(dateTime)
    const date = getDate(dateTime)
    const time = getTime(dateTime)

    return `${date} ${time}`
}

export function getDate(date: string | Date):string {
    date = getDateInstance(date)
    const dateString = date.toLocaleDateString()
    if (new Date().toDateString() === dateString) {
        return 'Сегодня'
    }
    return dateString
}

export function getTime (date: string | Date): string{
    date = getDateInstance(date)
    return date.toLocaleTimeString().slice(0, -3)
}