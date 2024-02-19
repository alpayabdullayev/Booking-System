import express from "express"
import { addToWishlist, createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controller/userController.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

export const UserRouter = express.Router()

UserRouter.post("/user",createUser)
UserRouter.get("/user",getAllUsers)
UserRouter.put("/user/:id",verifyUser,updateUser)
UserRouter.get("/user/:id",getUserById)
UserRouter.delete("/user/:id",verifyUser,deleteUser)
UserRouter.post("/users/:id/wishlist", verifyToken, addToWishlist);
