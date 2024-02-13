import express  from "express";
import upload from "../middleware/upload.js";
import { createHotelType, getAllHotelTypes } from "../controller/hotelTypeController.js";

export const HotelTypeRouter = express.Router()




HotelTypeRouter.post("/hoteltype", upload.single('image'), createHotelType);
HotelTypeRouter.get("/hoteltype",getAllHotelTypes)