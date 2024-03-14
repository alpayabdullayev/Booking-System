import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserBooking",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserBooking",
          required: true,
        },
        text: String,
        created: { type: Date, default: Date.now },
      },
    ],

    mainImage: { type: String, required: true },
    images: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model("BlogBooking", BlogSchema);
