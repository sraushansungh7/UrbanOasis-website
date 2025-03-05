const mongoose = require('mongoose');
const initdata=require("./data.js");
const Listing = require('../Mode/listing.js');


main().then(() => {
    console.log("Application initialized.");
  }).catch(err => {
    console.error("Application failed to initialize:", err);
  });


async  function main(){
   await  mongoose.connect("mongodb://localhost:27017/UrbanOasis")  

}


const initDb=async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"679d1eb26f9b88567a76a42d"}))
    await Listing.insertMany(initdata.data)
    console.log("data was initilized")

}

initDb();


