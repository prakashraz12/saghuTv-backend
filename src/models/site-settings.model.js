import mongoose from "mongoose";

const siteSettingsSchma = new mongoose.Schema({
    headerSetting:{
        type:String,
        required:true
    },
    footerSetting:{
        type:String,
        required:true
    },
    socailMedia:{
        facebook:{type:String, default:""},
        twitter:{type:String, default:""},
        youtube:{type:String, default:""},
        linkedIn:{type:String, default:""},
        tiktok:{type:String, default:""}
    },
    aboutUs:{
        type:String,
        required:true
    },
    disclaimer:{
        type:String,
        required:true
    },
    adsPolicy:{
        type:String,
        required:true

    }

})