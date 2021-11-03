import { Router } from './modules/Router'
import { SignInPage } from './pages/SignIn'
import { SignUpPage } from './pages/SignUp'


const router = new Router("#root");

router
    .use('/', SignInPage)
    .use('/sign-up', SignUpPage)
    .start();

// setTimeout(() => {
//     router.go("/reg");
// }, 3000)
