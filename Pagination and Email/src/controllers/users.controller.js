const User = require("../models/users.models");

const express = require("express");
const sendMail = require("../util/send.mail");
const router = express.Router();

//user Crud
router.post("/", async (req, res) => {

    try {
        const newUser = await User.create(req.body);

        const arr=[
            "prateek@masai.com",
            "nrupul@masai.com",
            "dhavel@masai.com",
            "swanand@masai.com",
            "aman@masai.com",
        ];
        const temp=arr.join(",")
        
     sendMail(
         "ranjan@sender.com",
         `${req.body.email}`+ temp,
         `Created a User ${req.body.first_name} ${req.body.last_name}`,
         "Some User Detail",
         "<h1> Created a User</h1>",
     );
          
        return res.status(201).send({ newUser });
    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });

    }

});

router.get("/", async (req, res) => {
    try {
        const page=+req.query.page || 1;
        const size=req.query.size || 10; 
        const offset=(page-1)*size; 
        const newUser = await User.find({}).skip(offset).limit(size)
        .lean().exec();

            const totalPage= Math.ceil((await User.find().countDocuments())/size);
        return res.status(201).send({ newUser, totalPage });

    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }

});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        res.send({ user });

    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }

});

module.exports = router;