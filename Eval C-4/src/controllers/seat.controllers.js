const Seat=require("../models/seat.models");

const express = require("express");
const router=express.Router();

// post movies
router.post("/",async (req,res) => {
    try{
        const seat=await Seat.create(req.body);
        return res.status(201).json({seat});
    }
    catch{
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
});

// router.get("/", async (req, res) => {
//     try{
//         const seats=await Seat.find({}).lean().exec();
//         return res.status(200).json({seats});
//     }
//     catch{
//         return res.status(500).json({ message: e.message, status: "Failed" })
//     }
// })

module.exports=router; 