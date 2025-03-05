if(process.env.NODE_ENV != "production"){
    require('dotenv').config();

}

const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const ejsmate = require("ejs-mate");
const methodOverride = require('method-override');

const Expresserror = require("./util/Expresserror.js");
const session=require("express-session");
const flash=require("connect-flash");

const passport=require("passport");

const LocalStrategy=require("passport-local");
const User = require("./Mode/user.js");
const  listing=require("./routes/listing.js")

const  UserRouter=require("./routes/user.js")
 const dburl=process.env.Altas_db;
const review=require("./routes/review.js")

const app = express();
const port = 3000;

// Middleware setup
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


store= MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.MYSESSION,
    },
    touchAfter: 24 *3000,
  })
  store.on("error",()=>{
    console.log("Error in mongo session store",err)
  })
const sessionoption={ secret:process.env.MYSESSION,
    store,
     resave: false, 
     saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 *60 * 1000,
         maxAge:7 * 24 *60 *1000,
        httpOnly:true,
    },
}
    
    
// Database connection
async function main() {
    try {
        await mongoose.connect(dburl);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Application failed to initialize:", err);
    }
}
main();





app.use(session(sessionoption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
   

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    next();
})

app.get("/registerUser", async (req, res) => {
    try {
        let fakeUser = new User({
            email: "student@gmail.com",
            username: "delta-student"
        });

        let newUser = await User.register(fakeUser, "helloworld"); // Hashes and saves the user
        res.send(newUser);
    } catch (error) {
        res.status(500).send({ error: error.message }); // Handle errors properly
    }
});


app.use("/listings", listing)
app.use("/listings/:id/reviews",review);
app.use("/" , UserRouter);





// 404 Error handler for unknown routes
app.all('*', (req, res, next) => {
    next(new Expresserror(404, "Page Not Found"));
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/listings`);
});
