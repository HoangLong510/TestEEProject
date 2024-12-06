import Login from "~/pages/auth/login/Login"
import Register from "~/pages/auth/register/Register"

const authRoutes = [
    { path: '/auth/login', component: Login },
    { path: '/auth/register', component: Register }
]

export default authRoutes