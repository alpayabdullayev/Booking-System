import mongoose, { Schema } from "mongoose";

const DestinationSliderSchema = new Schema(
  {
    images: [{ type: String, trim: true }],
    mainImage: { type: String, required: true },

  },
  { timestamps: true }
);

export default mongoose.model("DestinationSlider", DestinationSliderSchema);
