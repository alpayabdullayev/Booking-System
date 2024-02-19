import express from "express"
import { createBooking, getAllBookings } from "../controller/bookingController.js";

export const BookingRouter = express.Router();


BookingRouter.post('/book/:hotelId', createBooking);
BookingRouter.get('/book', getAllBookings);