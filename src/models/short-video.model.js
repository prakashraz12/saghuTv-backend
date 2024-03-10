// shortVideo.model.js
import mongoose from "mongoose"

const shortVideoSchema = new mongoose.Schema({
  shortVideoTitle: {
    type: String,
    required: true,
  },
  shortVideoLink: {
    type: String,
    required: true,
  },
});


export const ShortVideo = mongoose.model('ShortVideo', shortVideoSchema);


