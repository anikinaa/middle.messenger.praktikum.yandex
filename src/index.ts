import { Store, Router } from './modules'
import { SignInPage } from './pages/SignIn'
import { SignUpPage } from './pages/SignUp'
import { MessengerPage } from './pages/Messenger'
import { MessengerAddChat } from './pages/Messenger/blocks/AddChat'
import { MessengerChatSetting } from './pages/Messenger/blocks/ChatSetting'
import { SettingsPage } from './pages/Settings'
import { SettingPassword } from './pages/Settings/blocks/Password'
import { MessengerChatAddUser } from './pages/Messenger/blocks/ChatSetting/components/AddUser'
import './scss/main.scss'

document.getElementById('root')!.innerHTML = ''

Store.init()
const router = new Router('#root')

try {
    router
        .use(SignInPage)
        .use(SignUpPage)
        .use(MessengerPage)
        .use(MessengerAddChat)
        .use(MessengerChatSetting)
        .use(MessengerChatAddUser)
        .use(SettingsPage)
        .use(SettingPassword)
        .start()
} catch (e) {
    // eslint-disable-next-line no-console
    console.error('!!!!!!!!!!!!!!!!')
}
