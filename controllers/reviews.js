const express = require("express");
const mongoose = require("mongoose");

// const { validateReview,isLoggedIn,isReviewauthor} = require("../middleware.js");

const Listing = require("../Mode/listing.js");
const Review = require("../Mode/review.js");

module.exports.reviewpost=async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);

    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview)
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New review Created!")
    res.redirect(`/listings/${id}`);
};

module.exports.reviewdelete=async (req, res, next) => {
    const { id, reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return next(new Expresserror(400, "Invalid Review ID"));
    }

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted!")
    res.redirect(`/listings/${id}`);
};