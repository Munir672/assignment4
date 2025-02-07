import validator from 'validator';

const pizzaValidator = (req, res, next) => {
    // Initialize errors array
    res.locals.errors = [];

    // Validate Sauce 
    const validSauces = ["tomato", "alfredo"]; 
    if (!req.body.sauces || !validSauces.includes(req.body.sauces)) {
        let thisError = {
            field: "Sauces",
            message: "Invalid sauce selection. Please choose either 'Tomato' or 'Alfredo'."
        };
        res.locals.errors.push(thisError);
    }

    //  Validate Toppings
    const validToppings = ["Pepperoni", "Ham", "Vegatarian_Sausage", "Mushrooms", "Peppers", "Olives"];
    if (!req.body.Toppings || req.body.Toppings.length < 1 || req.body.Toppings.length > 3) {
        res.locals.errors.push({
            field: "Toppings",
            message: "You must select between 1 and 3 toppings."
        });
    }

    //  Validate Toppings 
    if (req.body.Toppings) {
        req.body.Toppings.forEach(element => {
            if (!validToppings.includes(element)) {
                res.locals.errors.push({
                    field: "Toppings",
                    message: `Invalid topping: ${element}. Please choose from the available options.`
                });
            }
        });
    }

    //  Validate Name
    req.body.fullName = req.body.fullName.trim();
    if (req.body.fullName.length < 3 || req.body.fullName.length > 30) {
        res.locals.errors.push({
            field: "Name",
            message: "Your name must be between 3 and 30 characters."
        });
    }

    //  Validate Email Format
    if (!validator.isEmail(req.body.email)) {
        res.locals.errors.push({
            field: "Email",
            message: "Invalid email format."
        });
    }

    next(); 
}


//color validation 
const colorValidator = (req, res, next) => {
    let color = req.query.color; 
    
    if (!color || !validator.isHexColor(color)) {
        color = "#fffeed"; // 
    }

    // Store validated color
    res.locals.color = color;

    next(); 
};


export { pizzaValidator, colorValidator };

