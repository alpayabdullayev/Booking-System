import express from "express";

import { countByCity,getHotelsByType,  createHotel, deleteHotel, getAllHotels, getHotelById, updateHotel, getHotels, getHotelRooms, addComment } from "../controller/hotelController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import upload from "../middleware/upload.js";

export const HotelRouter = express.Router();

HotelRouter.post("/hotels",upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]),createHotel);


HotelRouter.put("/hotels/:id",upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]),updateHotel);


HotelRouter.delete("/hotels/:id",verifyAdmin,deleteHotel);


HotelRouter.get("/find/:id", getHotelById);
HotelRouter.get("/countByCity", countByCity);
// HotelRouter.get("/countByType", countByType);
HotelRouter.get("/hotels/type/:typeId", getHotelsByType);


HotelRouter.get("/hotels/all", getAllHotels);

HotelRouter.get("/hotels", getHotels);
HotelRouter.get("/hotels/room/:id", getHotelRooms);


// HotelRouter.post("/comment",addComment)
HotelRouter.put('/comment/hotel/:id', addComment);
