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

export const RoomRouter = express.Router();

RoomRouter.post("/room/:hotelid", verifyAdmin, createRoom);

RoomRouter.put("/availability/:id", updateRoomAvailability);
RoomRouter.put("/room/:id", verifyAdmin, updateRoom);

RoomRouter.delete("/room/:id/:hotelid", verifyAdmin, deleteRoom);

RoomRouter.get("/room/:id", getRoomById);

RoomRouter.get("/room", getAllRooms);
