import './style.scss'
import { renderDOM } from '../../utils/renderDOM'
import { LoginPage } from './Login'

document.body.classList.add('body__dark')
renderDOM<LoginPage>(LoginPage)
