const User = require("../models/user.models");
var jwt = require('jsonwebtoken');
require("dotenv").config();
const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_Access_Key);
}

const register = async (req, res) => {
    try {
        // check email 
        let user = await User.findOne({ email: req.body.email });

        if (user)
            return res.status("Failed").json({ message: "Use Different Email Address" });

        user = await User.create(req.body);

        //token creation 
        let token = newToken(user);

        // return user and token

        return res.status(201).json({ user, token })


    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed to register" });
    }
}


const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        //check email
        if (!user)
            return res.status("Failed").json({ message: "Please Provide a valid Email Address and Password" });

            //check password

            const match=await user.checkPassword(req.body.password);

            if(!match) 
            return res.status("Failed").json({ message: "Please Provide a valid Email Address and Password" });

               //token creation 
        let token = newToken(user);

        // return user and token

        return res.status(201).json({ user, token })

    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed to login" });
    }
}

module.exports = { register, login, newToken };

