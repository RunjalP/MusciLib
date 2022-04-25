const express=require("express");
const router =express.Router();
const{ getUserById, getUser }=require("../controllers/userController")
const{ isSignedIn, isAuthenticated, isAdmin } =require("../controllers/authController")
const {getAllFiles,updateUserPassword,deleteOneUser,getAllUsers, getCategoryById,createCategory,deleteCategory,uploadFile,getProductById,deleteProduct,createUser,getAllCategory}=require("../controllers/adminController")
const {check} =require("express-validator");


router.param("userId",getUserById)
router.param("categoryId",getCategoryById)
router.param("productId",getProductById)
//create/delete Category

router.post("/admin/createcategory/:userId",isSignedIn,isAuthenticated,isAdmin, createCategory)
router.get("/admin/deletecategory/:userId/:categoryId",isSignedIn,isAuthenticated,isAdmin, deleteCategory)
router.post("/admin/deleteOneUser/:userId/",isSignedIn,isAuthenticated,isAdmin,deleteOneUser)
router.post("/admin/uploadfile/:userId/:categoryId",[check("productName").notEmpty()],isSignedIn,isAuthenticated,isAdmin,uploadFile)
router.post("/admin/updateUserPassword/:userId",isSignedIn,isAuthenticated,isAdmin,updateUserPassword)
router.get("/admin/deletefile/:userId/:productId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)
router.get("/admin/getAllCategory/:userId",isSignedIn,isAuthenticated,isAdmin,getAllCategory)
router.get("/admin/getAllUsers/:userId",isSignedIn,isAuthenticated,isAdmin,getAllUsers)
router.get("/admin/getAllFiles/:userId",isSignedIn,isAuthenticated,isAdmin,getAllFiles)

router.post("/admin/adduser/:userId",[
    check("Name","Enter your Name").notEmpty().isLength({min:2}),
    check("MobileNo","Enter a valid MobileNo").notEmpty().isLength({min:10,max:10}),
    check("Address","Enter your Address").notEmpty(),
    check("EmailId","Enter your EmailId").notEmpty().isEmail(),
    check("password","Enter a valid password").notEmpty().isLength({min:8,max:12})

 ],isSignedIn,isAuthenticated,isAdmin,createUser)


module.exports=router;
