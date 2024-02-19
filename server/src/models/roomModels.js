import mongoose, { Schema } from "mongoose";
const RoomSchema = new Schema(
  {
    number: { type: Number, required: true },
    type: { type: String },
    name: { type: String, required: true },
    about: { type: String, required: true },
    size: { type: Number, required: true },
    beds: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    children: { type: Number, required: true },
    price: { type: Number, required: true },
    mainImage: { type: String, required: true },
    images: [{ type: String, trim: true }],
    available: { type: Boolean, default: true },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Rooms", RoomSchema);
