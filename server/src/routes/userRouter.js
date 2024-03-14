import express from "express";
import {
  addToWishlist,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateAvatar,
  updateUser,
} from "../controller/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import upload from "../middleware/upload.js";

export const UserRouter = express.Router();

UserRouter.post("/user", verifyToken, createUser);
UserRouter.get("/user", getAllUsers);
UserRouter.put("/user/:id", upload.fields([{ name: "avatar" }]), updateUser);
UserRouter.get("/user/:id", getUserById);
UserRouter.delete("/user/:id", verifyUser, deleteUser);
UserRouter.post("/users/:id/wishlist", verifyToken, addToWishlist);
UserRouter.put("/users/:id/avatar", upload.single("avatar"), updateAvatar);
