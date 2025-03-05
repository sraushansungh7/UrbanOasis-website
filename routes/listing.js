const express = require("express");
const router = express.Router();

const {isLoggedIn, isowner,validateListing} =require("../middleware.js")

const wrapAsync = require("../util/wrapasync.js");
 // Import Review model
// Get all listings
const ListingController=require("../controllers/listings.js")
const multer  = require('multer');
const { required } = require("joi");
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage})

router.route("/")
.get(wrapAsync(ListingController.index))
.post( isLoggedIn ,upload.single('listing[image]'), validateListing, wrapAsync(ListingController.createlisting));



router.get("/new", isLoggedIn,ListingController.rendernewfrom);

router.route("/:id")
.get( wrapAsync(ListingController.showlisting))
.put(isLoggedIn,isowner,upload.single('listing[image]'), validateListing, wrapAsync(ListingController.updatelisting))
.delete(isLoggedIn,isowner, wrapAsync(ListingController.deletelisting));


// New listing form


// Show specific listing


// Edit listing form
router.get('/:id/edit',isLoggedIn,isowner, wrapAsync(ListingController.editlisting));

// Update listing

//new route

// Delete listing


module.exports = router;
