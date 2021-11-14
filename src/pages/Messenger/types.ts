import {
    AppBar, SideBar, Dialog,
} from '../../blocks'
import {NoChat} from "./blocks/NoChat";

export type IMessengerPageProps = {
    abbBar: AppBar;
    sideBar: SideBar;
    dialog: Dialog | NoChat;
};
