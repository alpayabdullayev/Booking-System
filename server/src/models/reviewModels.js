// review.js
import mongoose, { Schema } from "mongoose";

// const RatingSchema = new Schema({
//   sleep: { type: Number, min: 1, max: 5, required: true },
//   location: { type: Number, min: 1, max: 5, required: true },
//   service: { type: Number, min: 1, max: 5, required: true },
//   cleanliness: { type: Number, min: 1, max: 5, required: true },
//   guidance: { type: Number, min: 1, max: 5, required: true },
// });

const ReviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersHotel",
      required: true,
    },
    ratings: { type: Number, min: 1, max: 5 },
    comment: {
      type: String,
      required: true,
    },
    // replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
