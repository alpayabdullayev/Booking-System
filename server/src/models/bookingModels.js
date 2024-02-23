import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserBooking",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms",
      required: true,
    },

    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return this.start_time < value;
        },
        message: "End time must be after start time",
      },
    },
    total_price: {
      type: Number,
    },
    isActive: { type: Boolean, default: true },
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'cancelled'], 
      default: 'pending' 
    },

  },
  { timestamps: true }
);

export default mongoose.model("Bookings", bookingSchema);
