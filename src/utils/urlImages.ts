export const getUrlImage = (srs: unknown):string | null => (srs ? `https://ya-praktikum.tech/api/v2/resources${srs}` : null)
export const getNameImage = (srs: string | null):string | null => (srs ? srs.replace('https://ya-praktikum.tech/api/v2/resources', '') : null)
