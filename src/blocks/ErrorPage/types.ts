import { Link } from '@components'

export type IErrorPageProps = {
    code: string
    msg: string
    link: Link
}

export type IErrorPage = {
    props: {
        code: string
        msg: string
    }
}
