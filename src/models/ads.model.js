import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
 
    imageUrl: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    adsLink:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

export const Ads = new mongoose.model("Ads", adSchema);
