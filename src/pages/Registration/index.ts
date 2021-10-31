import './style.scss'
import { renderDOM } from '../../utils/renderDOM'
import { RegistrationPage } from './Registration'

document.body.classList.add('body__dark')
renderDOM<RegistrationPage>(RegistrationPage)
