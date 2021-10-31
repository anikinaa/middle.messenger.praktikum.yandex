import './style.scss'
import { renderDOM } from '../../utils/renderDOM'
import { ProfilePage } from './Profile'

document.body.classList.add('body__dark')
renderDOM<ProfilePage>(ProfilePage)
