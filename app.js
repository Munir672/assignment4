//-----------------IMPORT -------------------
import express from "express";
import path from "path";
import {colorValidator,pizzaValidator} from "./validatorScript.js";


//-------------------PORT---------------------------------
//intialize the express for app
const app = express();
//intialize a variable for port
const port = 3000;

//-----------------------APP USE--------------------------------------
//Express static middleware to serve the files in /public.
app.use(express.static("public"));
//Express urlencoded middleware to parse the body of POST requests 
app.use(express.urlencoded({extended: true}));
//here is the new engine thing 
app.set(`view engine`, `ejs`);




// post route to out a color and its name in the body
app.get('/', colorValidator, (req, res) => {
    res.render('index', { backgroundColor: res.locals.color });
});

//--------------MAIN CODE HERE--------------
// Home route with color validator 
// app.post('/', colorValidator, (req, res) => {
//     const nColor  = req.params.nColor ;
//     console.log(`new color is ${nColor}`);
//     res.render('index.ejs', { nColor });
// });


app.get("/", (req, res) => {
    console.log("here");
    res.render("index");
});

//Home route for the form using post
app.post("/orders",pizzaValidator,(req, res)=>{
     console.log("hehriwerbi");
    // If there are any errors, respond with them and stop further processing
    if (res.locals.errors.length > 0) {
        // If errors exist, render the error page with error messages
        res.render("error", { errors: res.locals.errors });
    } else {
        // If no errors, render the success page with user details
        res.render("success", { name: req.body.fullName, email: req.body.email });
    }
});



//--------------SERVER START--------------------------
//server is listening to this port 
app.listen(port, (req, res)=>{
    console.log("ihdjbci");
    console.log(`App is running on port ${port}`);
});
