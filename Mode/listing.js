const mongoose = require('mongoose');
const Review = require('./review.js');

const  Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
       type: String,
       require:true
    },

    description:String,
   
    image: {
        url:String,
        filename:String,
      },
   
   
    price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type: Schema.Types.ObjectId,
        ref:"Review",
      }

    ],
    owner:{
      type: Schema.Types.ObjectId,
      ref:"User",

    }
})

listingSchema.pre("findOneAndDelete", async function (next) {
  const listing = await this.model.findOne(this.getFilter()); // Get the listing being deleted
  if (listing) {
      await Review.deleteMany({ _id: { $in: listing.reviews } }); // Delete associated reviews
  }
  next();
});

const Listing=mongoose.model("listing",listingSchema);
module.exports =Listing; 