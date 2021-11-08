import { Store, Router } from './modules'
import { SignInPage } from './pages/SignIn'
import { SignUpPage } from './pages/SignUp'
import { MessengerPage } from "./pages/Messenger";
import { SettingsPage } from "./pages/Settings";
import { SettingPassword } from './pages/Settings/blocks/Password'

new Store()

const router = new Router("#root");

router
    .use(SignInPage)
    .use(SignUpPage)
    .use(MessengerPage)
    .use(SettingsPage)
    .use(SettingPassword)
    .start();
