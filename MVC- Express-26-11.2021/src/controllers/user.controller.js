const User = require('../models/user.model');

const express=require('express');
const router=express.Router();

//user Crud
router.post("/", async (req, res) => {

    try {
        const newUser = await User.create(req.body);
        return res.status(201).send({ newUser });
    }
    catch (e) {
        res.status(500).json({ message: e.message });

    }

});

router.get("/", async (req, res) => {
    try {
        const newUser = await User.find({}).lean().exec();
        return res.status(201).send({ newUser });

    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }

});

router.get("//:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        res.send({ user });

    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }

});

router.patch("//:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();
        return res.status(201).send({ user });
    }
    catch (e) {
        res.status(500).json({ message: e.message, status: failed });
    }

});

router.delete("//:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(user);
    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }

});

module.exports=router;