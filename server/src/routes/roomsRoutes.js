import express from "express";
import {
  createRoom,
  deleteRoom,
  deleteRooms,
  getAllRooms,
  getRoomById,
  updateRoom,
  updateRoomAvailability,
} from "../controller/RoomlController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../middleware/upload.js";

export const RoomRouter = express.Router();

RoomRouter.post("/room",upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 5 },
]), createRoom);

RoomRouter.put("/rooms/availability/:id", updateRoomAvailability);
RoomRouter.put(
  "/room/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  updateRoom
);

RoomRouter.delete("/room/:id/:hotelid",  deleteRoom);

RoomRouter.get("/room/:id", getRoomById);
RoomRouter.delete("/room/:id", deleteRooms);

RoomRouter.get("/room", getAllRooms);
