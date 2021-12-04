const User = require("../models/user.models");
require("dotenv").config();

const jwt = require('jsonwebtoken');
const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
}

const register = async (req, res) => {
    try {
        // check if email is already registered 
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        // throw error if registered 
        if (user)
            return res.status(400).json({ message: "already registered, provide different email address" });

        // create new user
        user = await User.create(req.body);  // lean() and exec() is not needed becoz it is passing in model to getting token 

        // validation 

        //hashing will be done in the model 

        // create token  
        const token = newToken(user);
        // return user and token 

        return res.status(201).json({ user, token });



    }
    catch (e) {
        res.status(500).json({ message: e.message, Status: e.status });
    }
};

const login = async (req, res) => {
    try {
        // check if user email is already registered 
        let user = await User.findOne({ email: req.body.email });
        // throw an err need to register first
        if (!user)
            return res.status(404).json({ message: "Please provide valid email address and password." });

        // if user is registered compare the passwords against the user email.
        const match = await user.checkPassword(req.body.password);

        if(!match) 
        return res.status(404).json({ message: "Please provide valid email address and password." });

          // create a token 
          const token = newToken(user);

          // return the user and token
          return res.status(201).json({ user, token });

    }
    catch (e) {
        res.status(500).json({ message: e.message, Status: e.status });
    }
};


module.exports = { register, login };

