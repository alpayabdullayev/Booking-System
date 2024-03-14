// import Booking from '../models/Booking';

// // Yeni bir rezervasyon oluşturma
// // export const createBooking = async (req, res, next) => {
// //   try {
// //     const { userId, hotelId, roomId, isActive } = req.body;

// //     const newBooking = new Booking({
// //       user: userId,
// //       hotel: hotelId,
// //       room: roomId,
// //       isActive: isActive
// //     });

// //     await newBooking.save();

// //     res.status(201).json({ message: "Rezervasyon başarıyla oluşturuldu.", booking: newBooking });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // Tüm rezervasyonları getirme
// // export const getAllBookings = async (req, res, next) => {
// //   try {
// //     const bookings = await Booking.find().populate('user hotel room');
// //     res.status(200).json(bookings);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // Belirli bir rezervasyonu getirme
// // export const getBookingById = async (req, res, next) => {
// //   try {
// //     const bookingId = req.params.id;
// //     const booking = await Booking.findById(bookingId).populate('user hotel room');

// //     if (!booking) {
// //       return res.status(404).json({ message: "Rezervasyon bulunamadı." });
// //     }

// //     res.status(200).json(booking);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // Belirli bir rezervasyonu güncelleme
// export const updateBooking = async (req, res, next) => {
//   try {
//     const bookingId = req.params.id;
//     const updateData = req.body;

//     const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });

//     if (!updatedBooking) {
//       return res.status(404).json({ message: "Rezervasyon bulunamadı." });
//     }

//     res.status(200).json(updatedBooking);
//   } catch (error) {
//     next(error);
//   }
// };

// // Belirli bir rezervasyonu silme
// export const deleteBooking = async (req, res, next) => {
//   try {
//     const bookingId = req.params.id;

//     const deletedBooking = await Booking.findByIdAndDelete(bookingId);

//     if (!deletedBooking) {
//       return res.status(404).json({ message: "Rezervasyon bulunamadı." });
//     }

//     res.status(200).json({ message: "Rezervasyon başarıyla silindi." });
//   } catch (error) {
//     next(error);
//   }
// };

import Booking from "../models/bookingModels.js";
import User from "../models/userModels.js";

const createBooking = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingDate = new Date(req.body.start_time);

  if (bookingDate < today) {
    return res
      .status(401)
      .json({ message: "Kecmis bir tarihe rezerv olmur." });
  }

  const booking = new Booking({
    hotel: req.params.hotelId,
    room: req.body.room,
    user: req.body.user,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    total_price: req.body.total_price,
  });

  try {
    const existingBooking = await Booking.findOne({
      room: booking.room,
      start_time: { $lt: booking.end_time },
      end_time: { $gt: booking.start_time },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Bu otaq zaman aralığında rezerve edilib.",
      });
    }

    const newBooking = await booking.save();

    const user = await User.findById(req.body.user);
    user.bookings.push(newBooking);
    await user.save();

    return res.status(201).json(newBooking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("room")
      .populate("hotel")
      .populate("user");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id)
      .populate("room")
      .populate("hotel")
      .populate("user");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const newStatus = req.body.status;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: newStatus },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Rezervasyon bulunamadı." });
    }

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createBooking };
