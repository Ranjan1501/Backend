const Screen=require("../models/screen.models");

const express = require("express");
const router=express.Router();

// post movies
router.post("/",async (req,res) => {
    try{
        const screen=await Screen.create(req.body);
        return res.status(201).json({screen});
    }
    catch{
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
});

router.get("/", async (req, res) => {
    try{
        const screens=await Screen.find({}).lean().exec();
        return res.status(200).json({screens});
    }
    catch{
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
})

module.exports=router; 