const Movie=require("../models/movie.models");

const express = require("express");
const router=express.Router();

// post movies
router.post("/",async (req,res) => {
    try{
        const movies=await Movie.create(req.body);
        return res.status(201).json({movies});
    }
    catch{
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
});

router.get("/", async (req, res) => {
    try{
        const movies=await Movie.find({}).lean().exec();
        return res.status(200).json({movies});
    }
    catch{
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
})

module.exports=router; 