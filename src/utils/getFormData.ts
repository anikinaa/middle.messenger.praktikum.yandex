/* eslint-disable-next-line no-undef */
type IFormData = Record<string, FormDataEntryValue | File>;

export function getFormData(e: Event): IFormData {
    const el = e.target as HTMLFormElement
    const formData: FormData = new FormData(el)
    const data: IFormData = {}
    const entries = formData.entries()
    Array.from(entries).forEach(([key, val]) => {
        data[key] = val
    })
    return data
}
