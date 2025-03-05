const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../Mode/user.js");
const wrapasync = require("../util/wrapasync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const UserController=require("../controllers/users.js")

// Render Signup Form
router.get("/signup",UserController.getsignup);
                            

// Handle Signup Logic
router.post("/signup",wrapasync(UserController.usersignuppost));




router.get("/login",UserController.loginget)

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),UserController.postlogin)


//logout req

router.get("/logout",UserController.getlogout)

module.exports = router;