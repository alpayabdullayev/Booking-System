import express from "express"
import { login, register, verifyEmail } from "../controller/authController.js"

export const AuthRouter = express.Router()

AuthRouter.post("/register",register)
AuthRouter.post("/login",login)
AuthRouter.post("/verify",verifyEmail)
 

