import { Router } from './modules/Router'
import { LoginPage } from './pages/Login'
import { RegistrationPage } from './pages/Registration'


const router = new Router("#root");

router
    .use('/', LoginPage)
    .use('/sign-up', RegistrationPage)
    .start();

// setTimeout(() => {
//     router.go("/reg");
// }, 3000)
