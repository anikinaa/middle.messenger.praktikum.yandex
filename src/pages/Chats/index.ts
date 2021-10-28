import './style.scss'
import { renderDOM } from '../../utils/renderDOM'
import { ChatsPage } from './Chats'

document.body.classList.add('body__light')
renderDOM<ChatsPage>(ChatsPage)
