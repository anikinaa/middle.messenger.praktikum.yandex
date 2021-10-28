import './style.scss'
import { renderDOM } from '../../utils/renderDOM'
import { ResetPasswordPage } from './ResetPassword'

document.body.classList.add('body__dark')
renderDOM<ResetPasswordPage>(ResetPasswordPage)
