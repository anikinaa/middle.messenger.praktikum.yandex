import { ButtonCircle } from '../../components'
import { AppBarProfile } from './components/Profile'
import { AppBarHeader } from './components/Header'

export interface IAppBarProps {
    profile: AppBarProfile;
    header?: AppBarHeader;
    action?: ButtonCircle;
}

export type IAppBar = Omit<IAppBarProps, 'profile'>;
