import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    savedPosts: {
      type: [String],
      default: [],
    },
    nectar: {
      type: Number,
      default: 0,
    },
    lastNectarAwardAt: { 
      type: Date, 
      default: null 
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
