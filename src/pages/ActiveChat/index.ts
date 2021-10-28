import './style.scss'
import { renderDOM } from '../../utils/renderDOM'
import { ActiveChatPage } from './ActiveChat'

document.body.classList.add('body__light')
renderDOM<ActiveChatPage>(ActiveChatPage)
