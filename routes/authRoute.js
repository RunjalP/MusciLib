const express=require("express");
const router =express.Router();
const {check} =require("express-validator");
const{signin ,signout,signup,isSignedIn} =require("../controllers/authController");

router.post("/signin",[
    check("MobileNo","Enter a valid MobileNo").notEmpty().isLength({min:10,max:10}),
    check("password","Enter a valid password").notEmpty().isLength({min:8,max:12})
],signin)
router.get("/signout",signout)
router.post("/signup",[
    check("Name","Enter your Name").notEmpty().isLength({min:2}),
    check("MobileNo","Enter a valid MobileNo").notEmpty().isLength({min:10,max:10}),
    check("Address","Enter your Address").notEmpty(),
    check("EmailId","Enter your EmailId").notEmpty().isEmail(),
    check("password","Enter a valid password").notEmpty().isLength({min:8,max:12})

 ],signup);



module.exports=router;