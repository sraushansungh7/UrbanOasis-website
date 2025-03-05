const express = require("express");
const User = require("../Mode/user.js");



module.exports.getsignup= (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.usersignuppost=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        
        console.log(registeredUser);  // Debugging

        req.login(registeredUser,(err)=>{
            if(err){
                return next();

            }
            req.flash("success", "welcome to urbanOasis!");
            res.redirect("/listings");
        });

     
     
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.loginget=(req,res)=>{
   res.render("users/login.ejs")

};


module.exports.postlogin=async(req,res)=>{

    req.flash("success","welcome to ubaroassis!")
    let redirectUrl= res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
    };



module.exports.getlogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
         return   next(err)
        }
        req.flash("success","you are successfuly logout")
        res.redirect("/listings")
    })
}