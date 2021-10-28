/* eslint-disable no-undef */
type IFormData = Record<string, FormDataEntryValue | File>;

function getFormData(el: HTMLFormElement): IFormData {
    const formData: FormData = new FormData(el)
    const data: IFormData = {}
    const entries = formData.entries()
    Array.from(entries).forEach(([key, val]) => {
        data[key] = val
    })
    return data
}

export function consoleFormData(e: Event): void {
    /* eslint-disable no-undef */
    const el = e.target as HTMLFormElement
    const data = getFormData(el)
    /* eslint-disable  no-console */
    console.log(data)
    e.preventDefault()
}
