import { Store, Router } from './modules'
import { SignInPage } from './pages/SignIn'
import { SignUpPage } from './pages/SignUp'
import { MessengerPage } from "./pages/Messenger";
import {MessengerAddChat} from './pages/Messenger/blocks/AddChat'
import {MessengerChatSetting} from "./pages/Messenger/blocks/ChatSetting";
import { SettingsPage } from "./pages/Settings";
import { SettingPassword } from './pages/Settings/blocks/Password'
import './scss/main.scss'

new Store()

const router = new Router("#root");

router
    .use(SignInPage)
    .use(SignUpPage)
    .use(MessengerPage)
    .use(MessengerAddChat)
    .use(MessengerChatSetting)
    .use(SettingsPage)
    .use(SettingPassword)
    .start();
