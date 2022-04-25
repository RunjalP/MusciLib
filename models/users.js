const mongoose=require("mongoose");
const uuid=require("uuid").v4;
const crypto=require("crypto");
const {ObjectId}=mongoose.Schema

const UserSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true,
        minlength:2
    },
    EmailId:{
        type:String,
        trim:true,
        unique:true
        
    },

    MobileNo:{
        type:Number,
        maxlength:10,
        required:true,
        unique:true
       
    },

    Encry_Password:{
        type:String,
        required:true,
    
    },
    salt:String,

   Address:{
     type:String,
     trim:true
   },
    Role:{
        type:Number,
    },
    ActiveMusic:{
        type:Array,
        default:[]
        
    },
    Bookmark:{
        type:Array,
        default:[]
    }

},{timestamps:true});

UserSchema.virtual("password").set(function(passwordd){
    this._password=passwordd;
    this.salt=uuid();
    this.Encry_Password=this.getSecurePassword(passwordd)

}).get(function(){
    return this.password;
})
UserSchema.methods={

    authenticatePassword:function(plainpassword){
        return this.getSecurePassword(plainpassword)===this.Encry_Password;

    },

     getSecurePassword :function(plainpassword){
        if(!plainpassword) return "";

        try{

            return crypto.createHmac("sha256",this.salt).update(plainpassword).digest("hex");
    
        }

        catch(error){
            return "";
        }

    }

}

module.exports=mongoose.model("User",UserSchema)