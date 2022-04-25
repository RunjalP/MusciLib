const Category=require("../models/category")
const Data=require("../models/data");
const fs=require("fs");
const multer=require("multer");
const path=require("path");
const {validationResult} =require("express-validator");
const User=require("../models/users");
const users = require("../models/users");
const formidable=require("formidable")


exports.getCategoryById= (req,res,next,id)=>{
    console.log(id)
   Category.findById(id).exec((err,catfound)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Cannot found Category"
            })
        }

        req.category=catfound
        next()
    })

}

exports.createCategory=(req,res)=>{

    const AddCategory= new Category(req.body)

 AddCategory.save((err,addedCategory)=>{

        if(err)
        {
            console.log(err)
            return res.status(400).json({
                error:"Cannot Add Category"
            })
        }

        var dirname='Data/'+addedCategory.categoryName;
        if(!fs.existsSync(dirname))
        {
            fs.mkdirSync(dirname,{ recursive: true })
        }

        res.json(addedCategory)

    })

}


exports.deleteCategory=(req,res)=>{
    var dirname='Data/'+req.category.categoryName;
   Category.deleteOne({_id:req.category._id}).exec((err,deletedcategory)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Failed to delete category"
            })
        }

        fs.rmSync(dirname, { recursive: true, force: true });
        res.json(deletedcategory)

    })
}


exports.uploadFile=(req,res)=>{

    console.log(req)
      let foldername=req.category.categoryName;
  
  const storage=multer.diskStorage({
      destination: "./Data/"+foldername,
  
      filename:function(req,file,cb){
          cb(null,Date.now()+file.originalname)
      }
  })
  
  const upload=multer({storage:storage}).single("myfile")
  
  upload(req,res,(err)=>{
      if(err){
           return res.status(400).json({error:err})
      }
  
      let newproduct=new Data({"productPath":req.file.path,"productCategory":req.category._id,"productName":req.body.productName,"mediaId":req.body.mediaId});
  
      newproduct.save((err,savedproduct)=>{
          if(err)
          {
              return res.status(400).json({
                  error:"Failed to add data"
              })
          }
  
          console.log(savedproduct)
          console.log(req.file.path)
          res.status(200).json({message:"file uploaded successfully"})
      
      })
  
  
     
  }
  )
  
  
  }
  



exports.getProductById=(req,res,next,id)=>{
    console.log(id)
    Data.findById(id).exec((err,productfound)=>{
         if(err)
         {
             return res.status(400).json({
                 error:"Product not found"
             })
         }
 
         req.product=productfound
         next()
     })
}


exports.deleteProduct=(req,res)=>{
    var dirname=req.product.productPath;
   Data.deleteOne({_id:req.product._id}).exec((err,deletedproduct)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Failed to delete product"
            })
        }

        fs.rmSync(dirname, { recursive: true, force: true });
        res.json({message:"Media successfully deleted"})

    })
}


exports.createUser=(req,res)=>{
    try{
    const errors=validationResult(req);

  

    if(!errors.isEmpty())
    {
  
      return res.status(422).json({
        error:errors.array()[0].msg
      })
  
    }
  
     const user= new User(req.body);
     user.save((err,savedUser)=>{
      if(err){ 
        console.log(err)  
        return res.status(401).json({error:err})
     }
       res.status(200).json({
           message:"User successfully added"
       })
  
     })
    }
    catch(e){
        res.send(e)
    }

}


exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,allCategory)=>{
        if(err){
            return res.status(422).json({
                error:err
            })

        }
        console.log(allCategory)
        res.json(allCategory)
    })
}

exports.getAllUsers=(req,res)=>{

    users.find().exec((err,allUsers)=>{
        if(err){
            return res.status(422).json({
                error:err
            })

        }

     
        for(let i=0;i<allUsers.length;i++)
        {
            allUsers[i].Encry_Password=undefined;
            allUsers[i].salt=undefined;
        }
        res.json(allUsers)

    })

}

exports.deleteOneUser=(req,res)=>{
    console.log(req.body)
try{

    User.deleteOne({_id:req.body.id}).exec((error,deleted)=>{
        if(error){
            return res.status(422).json({
                error:"Failed to delete the user"
            })

        }
    res.status(200).json({message:"User successfully Deleted"})
    })

}
catch(e){
    res.json({error:"Error in completing request"})
}
}




exports.updateUserPassword=async (req,res)=>{
  User.findOne({_id:req.body.id},(err,userfound)=>{
        try{
         if(err)
         {
          return res.json(400).json({
            error:err
          })
         }
         
         console.log(userfound)
     
         let newpass= userfound.getSecurePassword(req.body.newPassword);

          User.findByIdAndUpdate({_id:userfound._id}, {"Encry_Password":newpass}).exec((err,savedpassword)=>{
            if(err){
                return res.status(422).json({
                    error:"Failed to delete the user"
                })
    
            }
            res.status(200).json({message:"Password Successfully Updated"})
          })
        
         
         


}
catch(e){
  console.log(e)
}

    })

}



exports.getAllFiles=(req,res)=>{
    try{
    Data.find().populate("productCategory").exec((err,alldata)=>{
        if(err){
            return res.status(422).json({
                error:"Error in retriving details"
            })
        }
    
         res.send(alldata)

    })


    }
    catch(e){
     res.status(500).json({error:"Error in processing request"})
    }
}