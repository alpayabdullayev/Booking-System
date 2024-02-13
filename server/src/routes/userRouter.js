import express from "express"
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controller/userController.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

export const UserRouter = express.Router()

UserRouter.post("/user",createUser)
UserRouter.get("/user",verifyAdmin,getAllUsers)
UserRouter.put("/user/:id",verifyUser,updateUser)
UserRouter.get("/user/:id",verifyUser,getUserById)
UserRouter.delete("/user/:id",verifyUser,deleteUser)
