import mongoose from "mongoose";

const siteSettingsSchma = new mongoose.Schema({
  headerSettings: {
    type: String,
    required: true,
  },
  footerSettings: {
    type: String,
    required: true,
  },
  socailMedia: {
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    tiktok: { type: String, default: "" },
  },
  aboutUs: {
    type: String,
    default: "",
  },
  disclaimer: {
    type: String,
    default: "",
  },
  adsPolicy: {
    type: String,
    default: "",
  },
  userGuideLine: {
    type: String,
    default: "",
  },
  address:{
    type:String,
    default:""
  },
  phone:{
    type:String,
    default:""
  }
}, {timestamps:true});


export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchma);