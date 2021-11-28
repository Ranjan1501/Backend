const Topic=require('../models/topic.model'); 
const express = require('express'); 
const router=express.Router();


// topic Crud

router.post("", async (req, res) => {

    try {
        const topic = await Topic.create(req.body);
        return res.status(201).send({ topic });

    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});


router.get("", async (req, res) => {
    try {
        const topics = await Topic.find().lean().exec();
        return res.status(200).send({ topics });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

router.get("/:id", async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id).lean().exec();
        return res.status(201).send({ topic });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

router.patch("/:id", async (req, res) => {
    try {
        const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();
        return res.status(200).send({ topic });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const topic = await Topic.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(topic);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

module.exports=router; 
