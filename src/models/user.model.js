import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "editor",
    },
    department:{
      type: String,
      default:""
    },
    phone:{
      type:Number,
      default:0
    },
    about:{
      type:String,default:""
    },
    news:[
      {
        type:mongoose.Types.ObjectId,
        ref:"News"
      }
    ]
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
