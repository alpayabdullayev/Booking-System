import mongoose, { Schema } from "mongoose";

const replySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "UsersHotel" },
    comment: { type: Schema.Types.ObjectId, ref: "Review" },
    content: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Reply", replySchema);
