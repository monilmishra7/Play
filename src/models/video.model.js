 import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";





 const videoSchema = new Schema({
  videoFile : {
    typr: String,
    required : true
  },
 thumbnail : {
    typr: String,
    required : true
  },
  vtitle : {
    typr: String,
    required : true
  },
  description : {
    typr: String,
    required : true
  },
  duration:{
    type: Number,
    required: true
  },
  views:{
    type: Number,
    default: 0
  }, isPublished:{
    type: Boolean,
    default: true
  },
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User"
  }
 },{timestamps: true})

 

 export const Video = mongoose.model("Video", videoSchema)