import { Store, Router, pathRoutes } from '@modules'
import * as pages from './pages'
import { MessengerAddChat } from './pages/Messenger/blocks/AddChat'
import { MessengerChatSetting } from './pages/Messenger/blocks/ChatSetting'
import { SettingPassword } from './pages/Settings/blocks/Password'
import { MessengerChatAddUser } from './pages/Messenger/blocks/ChatSetting/components/AddUser'
import './scss/main.scss'

document.getElementById('root')!.innerHTML = ''

Store.init()
const router = new Router('#root')

try {
    router
        .use(pages.SignInPage)
        .use(pages.SignUpPage)
        .use(pages.NotFoundPage)
        .use(pages.InternalServerErrorPage)
        .use(pages.MessengerPage)
        .use(MessengerAddChat)
        .use(MessengerChatSetting)
        .use(MessengerChatAddUser)
        .use(pages.SettingsPage)
        .use(SettingPassword)
        .start()
} catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    Router.go(pathRoutes.internalServerError)
}
