import { AppBar } from './blocks/AppBar'
import { SideBar } from './blocks/SideBar'
import { Dialog } from './blocks/Dialog'
import { EmptyText } from './blocks/EmptyText'

export type IMessengerPageProps = {
    abbBar: AppBar
    sideBar: SideBar
    dialog: Dialog | EmptyText
};
