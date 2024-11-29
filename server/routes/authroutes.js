import {Router} from 'express'
import {register,login,logout,verifyUser} from '../controllers/authControllers.js'
import verifyToken from '../middlewares/TokenManage.js'

const authRouter = Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/verify",verifyToken,verifyUser)
authRouter.get("/logout",verifyToken,logout)


export default authRouter