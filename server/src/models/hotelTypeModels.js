import mongoose, { Schema } from "mongoose";

const HotelTypeSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  
});

export default mongoose.model("HotelType", HotelTypeSchema);
