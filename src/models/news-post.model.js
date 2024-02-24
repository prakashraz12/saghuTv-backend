import mongoose, { Schema } from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index:true
    },
    thumbnailImage: {
      type: String,
      default: "",
    },
    shortDescription: { // short description is just summerized part of news
      type: String,
      required: true,
      maxlength: 400,
      index:true
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      // this owner stands for who write the news
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isHighlighted:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

export const News = mongoose.model("News", newsSchema);
