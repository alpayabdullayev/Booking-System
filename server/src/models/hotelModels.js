import mongoose, { Schema } from "mongoose";

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "HotelType",
      required: true,
    }],
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
    },
    mainImage: { type: String, required: true },
    images: [{ type: String, trim: true }],
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    mapAdress: { type: String },
    hotelStars: { type: Number },
    languages: [ String ],
    about: { type: String },
  },
  { timestamps: true }
);

HotelSchema.statics.findByType = function (typeId) {
  return this.find({ type: typeId });
};

export default mongoose.model("Hotels", HotelSchema);
