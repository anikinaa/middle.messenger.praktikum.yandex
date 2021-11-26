import { ButtonCircle } from '../../../../components/ButtonCircle'
import { AppBarProfile } from './components/Profile'
import { AppBarHeader } from './components/Header'

export type IAppBarProps = {
    profile: AppBarProfile
    header?: AppBarHeader
    action?: ButtonCircle
}
