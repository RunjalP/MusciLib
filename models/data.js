const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema

const categorySchema= new mongoose.Schema({
     productPath:{
         type:String,
         required:true
     },

     productCategory:{
         type:ObjectId,
         ref:"Category"
   },

   productName:{
    type:String,
    required:true,

   },
//    mediaId:{
//        type:Number,
//        required:true
//    }


},{timestamps:true})

module.exports=mongoose.model("Data",categorySchema)