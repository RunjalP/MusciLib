require("dotenv").config()
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");


const cookieParser=require("cookie-parser");
const authRoutes =require("./routes/authRoute");
const userRoutes =require("./routes/userRoute");
const adminRoutes=require("./routes/adminRoute");
const { populate } = require("./models/users");
const app=express();


app.use(bodyParser.json())
app.use(cors({origin:true,credentials:true}));
app.use(cookieParser())
app.use("/api/auth/",authRoutes)
app.use("/api/auth/",userRoutes)
app.use("/api/auth/",adminRoutes);




//Database connection
mongoose.connect("mongodb+srv://RunjalDB:Rajashree%401970@cluster0.dqyzr.mongodb.net/MusicDB?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to database")
}).catch((e)=>{
    console.log(e)
})
//port listening
app.listen(process.env.PORT ||8000,()=>{
    console.log("server started")
})


app.use(express.static("frontend/build"))