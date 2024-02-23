import mongoose, { Schema } from "mongoose";
const RoomSchema = new Schema(
  {
    number: { type: Number, },
    type: { type: String },
    name: { type: String, },
    about: { type: String, },
    size: { type: Number, },
    beds: { type: Number, },
    maxPeople: { type: Number, },
    children: { type: Number, },
    price: { type: Number, },
    mainImage: { type: String, },
    images: [{ type: String, trim: true }],
    available: { type: Boolean, default: true },
    // roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],    
  },
  { timestamps: true }
);

export default mongoose.model("Rooms", RoomSchema);
