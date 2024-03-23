import mongoose from "mongoose";

const liveTvSchema = new mongoose.Schema(
  {
    liveTvTitle: {
      type: String,
      required: true,
    },
    liveTvVideoLink: {
      type: String,
      required: true,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    createdAt: {
      type:Date,
      default:Date.now
    }
  },
  
);

export const LiveTv = mongoose.model("Live", liveTvSchema);
