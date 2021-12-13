const Theatre=require("../models/theatre.models");

const express = require("express");
const router=express.Router();

// post movies
router.post("/",async (req,res) => {
    try{
        const theatre=await Theatre.create(req.body);
        return res.status(201).json({theatre});
    }
    catch{
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
});

router.get("/", async (req, res) => {
    try{
        const theatres=await Theatre.find({}).lean().exec();
        return res.status(200).json({theatres});
    }
    catch{
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
})

module.exports=router; 