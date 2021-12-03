const User = require("../models/users.models");

const express = require("express");
const fs = require("fs");

const router = express.Router();
const upload = require("../middleware/upload")

//user Crud
router.post("/", upload.single("profile_pic"), async (req, res) => {


    try {
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path,
            // image_urls: filePaths,

        });
        return res.status(201).send({ newUser });
    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });

    }

});


router.get("/", async (req, res) => {

    try {
        const page = +req.query.page || 1
        const size = +req.body.size || 5 
        const offset= (page-1)*size; 
        const newUser = await User.find({}).skip(offset).limit(size)
            .lean().exec();
            const totalPage=Math.ceil(await (User.find({}).countDocuments())/size); 
        return res.status(201).send({ newUser, totalPage });

    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }

});


router.patch("/:id", upload.single("profile_pic"),async (req, res) => {
   try{
        const user = await User.findById(req.params.id)
        await fs.unlink(`${user.profile_pic}`,(err)=>{
            if(err)  throw err;
            console.log("Your profile_pic is Updated")
        });
       
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            profile_pic: req.file.path,
            new:true,
        })
        res.send({ updateUser });
    }
    
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }

});

router.delete("/:id", async (req, res) => {
    try {
    
        const user = await User.findOneAndDelete({id: req.params.id}, 
        (err, result) => {
        if (err) return res.send(500, err)
        console.log('got deleted');
        },{
            new: true,
        })
               
                res.send({ user });

    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }

});

module.exports = router;