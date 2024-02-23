import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
} from "../controller/bookingController.js";

export const BookingRouter = express.Router();

BookingRouter.post("/book/:hotelId", createBooking);
BookingRouter.get("/book", getAllBookings);
BookingRouter.put("/book/:id/status", updateBookingStatus);
BookingRouter.get("/book/:id/", getBookingById);
