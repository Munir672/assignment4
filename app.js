//-----------------IMPORT -------------------
import express from "express";
import path from "path";
import {pizzaValidator, colorValidator} from "./validatorScript.js";
//-------------------PORT---------------------------------
//intialize the express for app
const app = express();
//intialize a variable for port
const port = 3000;

//-----------------------APP USE--------------------------------------
//Express urlencoded middleware to parse the body of POST requests 
app.use(express.urlencoded({extended: true}));
//here is the new engine thing 
app.set(`view engine`, `ejs`);

//--------------MAIN CODE HERE--------------
//New route for get"/"
app.get("/", colorValidator, (req, res) => {
    console.log(`Incoming GET request with color: ${req.query.color}`);
    res.render("index", { newColor: res.locals.color });
});

//Express static middleware to serve the files in /public.
app.use(express.static("public"));

//Home route for the form using post
app.post("/orders",pizzaValidator,(req, res)=>{
     
    // If there are any errors, respond with them and stop further processing
    if (res.locals.errors.length > 0){
        // If errors exist, render the error page
        res.render("error", { errors: res.locals.errors });
    } else {
        // If no errors, render the success page 
        res.render("success", { name: req.body.fullName, email: req.body.email });
    }
});

//--------------SERVER START--------------------------
//server is listening to this port 
app.listen(port, (req, res)=>{
    console.log("ihdjbci");
    console.log(`App is running on port ${port}`);
});
