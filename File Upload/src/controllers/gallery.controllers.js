const Gallery=require("../models/gallery.models")
const upload=require("../middleware/upload");
const express = require("express");

const router = express.Router();


//user Crud
router.post("/multiple", upload.any("pictures"), async (req, res) => {
    const filePaths = req.files.map((file) => file.path);
    try {
        const newUser = await Gallery.create({
            pictures: filePaths,
        });
        return res.status(201).send({ newUser });
    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });

    }

});

router.get("/", async (req, res) => {
    // care full file. path

    try {
        const page = +req.query.page || 1
        const size = +req.body.size || 5
        const offset = (page - 1) * size;
        const newUser = await Gallery.find({}).skip(offset).limit(size)
            .lean().exec();
        const totalPage = Math.ceil(await (Gallery.find({}).countDocuments()) / size);
        return res.status(201).send({ newUser });
    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });

    }

});

router.delete("/:id", async (req, res) => {
    try {
    
        const user = await Gallery.findOneAndDelete({id: req.params.id}, 
        (err, result) => {
        if (err) return res.send(500, err)
        console.log('Pictures deleted');
        },{
            new: true,
        });
               
                res.send({ user });

    }
    catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }

});


module.exports = router;