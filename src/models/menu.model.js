import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    menuName: {
      type: String,
      require: true,
      unique: true,
    },

    menuOrder: {
      type: Number,
      required: true,
      unique: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

export const Menu = mongoose.model("Menu", menuSchema);
