import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Ads = new mongoose.model("Ads", adSchema);
