import {
    AppBar, SideBar, Dialog, MessageForm,
} from '../../blocks'

export type IActiveChatPage = {
    abbBar: AppBar;
    sideBar: SideBar;
    dialog: Dialog[];
    messageForm: MessageForm;
};
