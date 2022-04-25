const User=require("../models/users");
const Data=require("../models/data");
const path=require("path")

exports.getUserById=async(req,res,next,id)=>{
    console.log("ID is",id)
    User.findById({_id:id}).exec((err,usercatch)=>{
        if(err)
        {
            console.log("REquet is comming")
            console.log(err)
            return res.status(422).json({
                error:"User not found in database"
            })
        }
        
       // console.log("REquet ...")
 //console.log(usercatch)
        req.profile=usercatch;

        next();
    })
}
exports.getUser=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.Encry_Password=undefined
    return res.json(req.profile)
}

exports.getAllCategoryProducts=(req,res)=>{
   // console.log(req.category)
    Data.find({productCategory:req.category._id}).populate("productCategory").exec((err,allProducts)=>{
        if(err)
        {
            return res.status(422).json({
                error:"Error retriving produts"
            })
        }

        res.send(allProducts)
    })

}

exports.getProductById=(req,res,next,id)=>{
    //console.log(id)
    Data.findById(id).exec((err,singleProduct)=>{
        if(err)
        {
            return res.status(422).json({
                error:"Error retriving produts"
            })
        }

        //console.log(singleProduct)
        req.productInfo=singleProduct;
        next()
    })
    
    
}

exports.getFile=(req,res)=>{
  //console.log("dddd")
    let VIDEO_PATH=req.productInfo.productPath;
   //console.log(VIDEO_PATH)
    let abc= path.resolve(VIDEO_PATH)

  //  console.log("RSP")




res.sendFile(abc)




}







exports.savePlayList=async(req,res)=>{
    try{
   // console.log(req.profile._id)
   User.findById({_id:req.profile._id}, {ActiveMusic:1}).exec((error, retrived)=>{
        if(error)
        {
            //console.log(error)
            return res.status(422).json({
                error:"Error in updating product"
            })
        }
       // console.log(retrived)
      // let byar=[]
        if(retrived.ActiveMusic.length==0)
        {
            User.findOneAndUpdate({_id:req.profile._id}, {"ActiveMusic":req.body.ActiveMusic}).exec((error, r)=>{
                    if(error)
                    {
                        console.log(error)
                        return res.status(422).json({
                            error:"Error in updating product"
                        })
                
                       
                    }
                    res.send(r)
                })

        }
        else
        {
         let mainar=[];
         mainar=[...retrived.ActiveMusic,req.body.ActiveMusic];
         console.log(mainar)

  let uniquser=[...mainar.reduce((map,obj)=> map.set(obj.itemid,obj), new Map()).values()]

    console.log(uniquser)

//     let callength=uniquser.length;
//  let topar=[];

//   if(callength>5)
//   {
    // for(var t=callength-1;t>callength-4;t--)
    // {

    //     topar.push(uniquser[t])
    // }



    User.findOneAndUpdate({_id:req.profile._id}, {"ActiveMusic":uniquser}).exec((error, r)=>{
        if(error)
        {
            console.log(error)
            return res.status(422).json({
                error:"Error in updating product"
            })
    
           
        }
        res.send(r)
    })



// }
// else
// {

//  User.findOneAndUpdate({_id:req.profile._id}, {"ActiveMusic":uniquser}).exec((error, r)=>{
//     if(error)
//     {
//         console.log(error)
//         return res.status(422).json({
//             error:"Error in updating product"
//         })

       
//     }
//     res.send(r)
// })
         
// }
           
      
        }

    })
}
catch(e){
    return res.status(500).json({
        error:"Errorin processing request"
    })
}
}

// exports.getactiveMedia=async(req,res)=>{
//    await User.findById({_id:req.profile._id},{ActiveMusic:1}).exec((error,gotmedia)=>{
//         if(error)
//         {
//             console.log(error)
//             return res.status(422).json({
//                 error:"Error in fetching ActiveMusic"
//             })
//         }
   

//     res.send(gotmedia)
//     console.log(gotmedia)
// })
// }



exports.getActiveMusicArray=async(req,res)=>{
    try{
      User.findById({_id:req.profile._id}, {ActiveMusic:1,Bookmark:1}).exec((error, retrived)=>{
            if(error)
            {
                //console.log(error)
                return res.status(422).json({
                    error:"Error in updating product"
                })
            }
           
           // res.send(retrived);
     Data.find({_id: retrived.Bookmark}).populate("productCategory").exec((error,found)=>{
            if(error)
            {
                //console.log(error)
                return res.status(422).json({
                    error:"Error in updating product"
                })
            } 
            
            let prdtarray=new Array();
            console.log(found)
           found.map((q,key)=>{
             //  console.log(q._id)
               let val={"prouctId":q._id,"productName":q.productName,"Category":q.productCategory._id,"CategoryName":q.productCategory.categoryName=="Vedios"? 1 : 0};
               prdtarray.push(val);
           })
           console.log(prdtarray)

           res.status(200).json({
               "ActiveMusic":retrived.ActiveMusic,
               "Bookmark":prdtarray
           })
           
         })

             
        })

    }
    catch(e){
        res.status(500).json({error:"Failed to load files"})
    }
}




exports.getBookmarkData=(req,res)=>{
    try{

        User.findById({_id:req.profile._id}, {Bookmark:1}).exec((error, retrived)=>{
            if(error)
            {
                //console.log(error)
                return res.status(422).json({
                    error:"Error in updating product"
                })
            }

            let mainar=[];
            console.log(req.body.productId)
            mainar=[...retrived.Bookmark,req.body.productId];
            console.log(mainar)
     let lex=0
     let uniquser=[...new Set(mainar)]
   
       console.log("Uniquser is",uniquser)








        User.findOneAndUpdate({_id:req.profile._id}, {"Bookmark":uniquser}).exec((error, r)=>{
            if(error)
            {
                console.log(error)
                return res.status(422).json({
                    error:"Error in updating product"
                })
        
               
            }
            //res.send(r.Bookmark)
        
            Data.find({_id: r.Bookmark}).populate("productCategory").exec((error,found)=>{
                if(error)
                {
                    //console.log(error)
                    return res.status(422).json({
                        error:"Error in updating product"
                    })
                } 
                
                let prdtarray=new Array();
                console.log(found)
               found.map((q,key)=>{
                 //  console.log(q._id)
                   let val={"prouctId":q._id,"productName":q.productName,"Category":q.productCategory._id,"CategoryName":q.productCategory.categoryName=="Vedios"? 1 : 0};
                   prdtarray.push(val);
               })
               console.log(prdtarray)
    
               res.send(prdtarray)
               
             })
    





        })
        
    })

    }
    catch{
     res.status(500).json({error:"Errorin fetching Bookmarked data"})
    }
}