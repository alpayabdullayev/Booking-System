import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: { type: String, unique: true, trim: true, text: true },
    country: {
      type: String,
      //   required: true,
    },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dfmannche/image/upload/v1707221210/Default_pfp.svg_fvke9k.png",
    },
    city: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    review: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    isVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    wishlist: [
      {
        hotel: { type: Schema.Types.ObjectId, ref: "Hotels" },
      },
    ],
    unavailableDates: [],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bookings",
      },
    ],
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogBooking",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.emailVerification = function () {
  this.emailVerificationToken = crypto.randomBytes(20).toString("hex");
  this.emailVerificationExpires = Date.now() + 3600000;
};

// UserSchema.methods.generatePasswordResetToken = function () {
//   this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
//   this.resetPasswordExpires = Date.now() + 3600000
// }

export default mongoose.model("UserBooking", UserSchema);


