import {
    AppBar, SideBar, Dialog,
} from '../../blocks'
import { EmptyText } from './blocks/EmptyText'

export type IMessengerPageProps = {
    abbBar: AppBar;
    sideBar: SideBar;
    dialog: Dialog | EmptyText;
};
