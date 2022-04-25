const User =require("../models/users");

const {validationResult} =require("express-validator");
const jwt=require("jsonwebtoken");
const expressJwt=require("express-jwt");


exports.signup=async (req,res)=>{

  const errors=validationResult(req);

  

  if(!errors.isEmpty())
  {
  

    return res.status(422).json({
      message:errors.array()[0].msg
    })

  }

   const user= new User(req.body);
   await user.save((err,savedUser)=>{
    if(err) return res.status(401).json({message:err})

    return res.json(savedUser);

   })

}






exports.signin=async(req,res)=>{
    const{MobileNo,password}=req.body;
    console.log(password)
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {

    return res.status(422).json({
      error:errors.array()[0].msg
    })

  }

 User.findOne({MobileNo},(err,userfound)=>{
   try{
    if(err)
    {
     return res.json(400).json({
       error:err
     })
    }
    
    console.log(userfound)

    const{_id,Role,MobileNo,Address,EmailId,Name,ActiveMusic}=userfound;

     if(!userfound.authenticatePassword(password)){
  return res.status(400).json({
    error:"MobileNo or password is wrong"
  })
}
  const token=jwt.sign({_id},process.env.SECRET)

  //console.log("aya request")
  res.cookie("token",token,{secure:true,httpOnly:true});

  console.log({token,user:{_id,Role,EmailId,Name,MobileNo,Address}})
   res.send({token,user:{_id,Role,EmailId,Name,MobileNo,Address,ActiveMusic}})
   }
   catch(e){
     console.log(e)
    return res.status(500).json({
       error:"Error in processing request"
     })
   }
   
  })

}





exports.signout=(req,res)=>{
//res.cookie("token","dddcd",{secure:true,httpOnly:true})
res.clearCookie("token")
 return   res.json({
        message:"User Signout"  
      })

}


 exports.isSignedIn=expressJwt({
  secret:process.env.SECRET,
  userProperty:"auth",
  algorithms: ['HS256'],

});

exports.isAuthenticated=(req,res,next)=>{
 // console.log(req.auth)
  let checker=req.auth && req.profile && req.profile._id==req.auth._id;
  if(!checker)
  {
    return res.status(403).json({
      error:"Access Denied"
    })
  }

  next()
}

exports.isAdmin=(req,res,next)=>{

  //console.log(req.profile)
  if(req.profile.Role==1)
  {
  
    return res.status(403).json({
      error:"Access Denied"
    })

    
    
  }
  next()

}