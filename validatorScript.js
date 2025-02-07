import validator from 'validator';

const pizzaValidator = (req, res, next) => {
    res.locals.errors = [];

    // Check if sauces are selected and valid
    const sauceArray = ["tomato", "alfredo"];
    if (!req.body.sauces || !Array.isArray(req.body.sauces) || !req.body.sauces.every(sauce => sauceArray.includes(sauce))) {
        res.locals.errors.push({
            field: "Sauces",
            message: "Your selected sauce is not in our list."
        });
    }

    // Check toppings: must be between 1 and 3, and valid toppings
    const topArray = ["Pepperoni", "Ham", "Vegatarian_Sausage", "Mushrooms", "Peppers", "Olives"];
    if (!req.body.Toppings || req.body.Toppings.length < 1 || req.body.Toppings.length > 3) {
        res.locals.errors.push({
            field: "Toppings",
            message: "You must select between 1 and 3 toppings."
        });
    } else {
        req.body.Toppings.forEach(element => {
            if (!topArray.includes(element.trim())) {
                res.locals.errors.push({
                    field: "Toppings",
                    message: `The topping ${element} is not in our list.`
                });
            }
        });
    }

    // Trim spaces from fullName before validation
    if (req.body.fullName) {
        req.body.fullName = req.body.fullName.trim();
    } else {
        req.body.fullName = "";
    }

    // Validate User's Name Length
    if (req.body.fullName.length < 3 || req.body.fullName.length > 30) {
        res.locals.errors.push({
            field: "Name",
            message: "Your name must be between 3 and 30 characters."
        });
    }

    // Email Validation
    if (!req.body.email || !validator.isEmail(req.body.email.trim())) {
        res.locals.errors.push({
            field: "Email Field",
            message: "Your email is not a valid email."
        });
    }

    next();
};

// Validate the color
const colorValidator = (req, res, next) => {
    let color = (req.query.color || '').trim(); // Get color from query, ensuring it's a string

    // Validate the color using the validator.js library
    if (!validator.isHexColor(color)) {
        color = '#fffeed'; // Default color if invalid
    }

    res.locals.color = color; // Store the validated color for use in templates
    next();
};


export { pizzaValidator, colorValidator };
