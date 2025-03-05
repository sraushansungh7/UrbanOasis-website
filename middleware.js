const Listing=require("./Mode/listing")
const Review=require("./Mode/review")
const { listingSchema , reviewSchema} = require('./Schema.js'); 
const Expresserror = require("./util/Expresserror.js");

module.exports.isLoggedIn=(req,res,next)=>{
    // console.log(req.path,"..",req.originalUrl)
    if(!req.isAuthenticated()){
        //redirecturl
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","please  logged in ")
        res.redirect("/login")
    }
    next();
};


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    };
    next();
};


module.exports.isowner=async(req,res,next)=>{
    let { id } = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.curruser._id)){
        req.flash("error","you don't have access to edit or delete")
       return  res.redirect(`/listings/${id}`)
    };
    next();
}


module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new Expresserror(400, errmsg);
    } else {
        next();
    }
};


// Middleware for validating review data
module.exports.validateReview =(req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new Expresserror(400, errmsg);
    } else {
        next();
    }
};


module.exports.isReviewauthor=async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","you are not author of this review")
       return  res.redirect(`/listings/${id}`)
    };
    next();
}

