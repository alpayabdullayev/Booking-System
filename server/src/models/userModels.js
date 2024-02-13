import mongoose , {Schema} from "mongoose";
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
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
        'https://res.cloudinary.com/dfmannche/image/upload/v1707221210/Default_pfp.svg_fvke9k.png'
    },
    city: {
      type: String,
      trim: true
    //   required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true
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
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    isVerified: { type: Boolean, default: false },
    wishlist: [
      {
        hotel: { type: Schema.Types.ObjectId, ref: "Hotels" },
      },  
    ],
  },
  { timestamps: true }
);

export default mongoose.model("UserBooking", UserSchema);