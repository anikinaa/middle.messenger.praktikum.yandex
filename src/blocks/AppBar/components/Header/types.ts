import { Avatar } from '../../../../components'

export type IAppBarHeaderMainProps = {
    avatar: string;
    name: string;
}

export type IAppBarHeader = {
    props: IAppBarHeaderMainProps
}

export type IAppBarHeaderProps = {
    avatar: Avatar;
    name: string;
}
