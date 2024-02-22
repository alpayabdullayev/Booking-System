import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  updateRoomAvailability,
} from "../controller/RoomlController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../middleware/upload.js";

export const RoomRouter = express.Router();

RoomRouter.post("/room", createRoom);

RoomRouter.put("/rooms/availability/:id", updateRoomAvailability);
RoomRouter.put(
  "/room/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  verifyAdmin,
  updateRoom
);

RoomRouter.delete("/room/:id/:hotelid", verifyAdmin, deleteRoom);

RoomRouter.get("/room/:id", getRoomById);

RoomRouter.get("/room", getAllRooms);
