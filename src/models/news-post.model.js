import mongoose, { Schema } from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    bannerImage: {
      type: String,
      default: "",
    },
    shortDescription: {
      // short description is just summerized part of news
      type: String,
      required: true,
      maxlength: 400,
      index: true,
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
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isHighlighted: {
      type: Boolean,
      default: false,
    },
    sharingNumber: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const News = mongoose.model("News", newsSchema);
