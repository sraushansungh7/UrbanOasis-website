const Listing=require("../Mode/listing")
const mongoose = require("mongoose");




module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings })
};






module.exports.rendernewfrom=(req, res) => {

    res.render('listings/new.ejs');
};

module.exports.showlisting=async (req, res, next) => {
    let { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Expresserror(400, "Invalid Listing ID"));
    }

    const listing = await Listing.findById(id)
    .populate(
        {path:"reviews",
        populate:{
            path:"author"
        },

    })
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing Not Found");
        return res.redirect("/listings"); // ✅ Prevents further execution
    }

    res.render("listings/show.ejs", { listing });

};


module.exports.createlisting=async (req, res, next) => {
    let url =req.file.path;
    let filename=req.file.filename;
   
//
    const newListing = new Listing(req.body.listing); // After validation, we can safely access req
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New Listing Created!")
    res.redirect("/listings");
};


module.exports.editlisting=async (req, res, next) => {
    let { id } = req.params;


    const listing = await Listing.findById(id);
   
    if (!listing) {
        req.flash("error", "Listing Not update Found");
    res.redirect("/listings")
    }
   let original=listing.image.url;
   original=original.replace("/upload","/upload/h_300,w_2560")

    res.render("listings/edit.ejs", { listing,original });
};


module.exports.updatelisting=async (req, res, next) => {
    let { id } = req.params;
   
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (req.file) {
        const { path: url, filename } = req.file;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success"," Listing Updated!")
    res.redirect(`/listings/${id}`);
};



module.exports.deletelisting=async (req, res, next) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new Expresserror(404, "Listing Not Found");
    }
    req.flash("success","Listing Deleted!")
    res.redirect("/listings");
}