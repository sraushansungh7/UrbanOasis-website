const express = require("express");
const router = express.Router({ mergeParams: true }); // Enables access to `id` from parent routes

const wrapAsync = require("../util/wrapasync.js");





const { validateReview,isLoggedIn,isReviewauthor} = require("../middleware.js");
const ReviewController=require("../controllers/reviews.js")



// Add a review to a listing
router.post("/",isLoggedIn, validateReview, wrapAsync(ReviewController.reviewpost));

// Delete a review from a listing
router.delete("/:reviewId",isLoggedIn,isReviewauthor, wrapAsync(ReviewController.reviewdelete));

module.exports = router;
