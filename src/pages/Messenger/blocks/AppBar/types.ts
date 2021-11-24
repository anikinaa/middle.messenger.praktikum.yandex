import { ButtonCircle } from '../../../../components'
import { AppBarProfile } from './components/Profile'
import { AppBarHeader } from './components/Header'

export type IAppBarProps = {
    profile: AppBarProfile
    header?: AppBarHeader
    action?: ButtonCircle
}
