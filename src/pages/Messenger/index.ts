import './style.scss'
import { renderDOM } from '../../utils/renderDOM'
import { ActiveChatPage } from './Messenger'

document.body.classList.add('body__light')
renderDOM<ActiveChatPage>(ActiveChatPage)
