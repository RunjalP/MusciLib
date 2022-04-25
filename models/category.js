const mongoose=require("mongoose");

const categorySchema= new mongoose.Schema({
    categoryName:{
        type:String,
        maxlength:32,
        required:true
    },


},{timestamps:true})

module.exports=mongoose.model("Category",categorySchema)