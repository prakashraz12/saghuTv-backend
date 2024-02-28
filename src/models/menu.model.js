import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    menuOrder: {
      type: Number,
      required: true,
      unique: true,
    },
    categoryId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
  },
  { timestamps: true }
);

export const Menu = mongoose.model("Menu", menuSchema);
