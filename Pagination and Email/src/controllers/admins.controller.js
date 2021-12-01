const Admin=require("../models/admins.models");

const express = require("express");
const router=express.Router();

//user Crud
router.post("", async (req, res) => {

    try {
        const newAdmin = await Admin.create(req.body);
        return res.status(201).send({ newAdmin });
    }
    catch (e) {
        res.status(500).json({ message: e.message, status:"Failed" });

    }

});

router.get("", async (req, res) => {
    try {

        const page=+req.query.page || 1;
        const size=req.query.size || 10; 
        const offset=(page-1)*size;

        const newAdmins = await Admin.find({}).skip(offset).limit(size)
        .populate({path:"user_id", model:"user"})
    
        .lean()
        .exec();
        const totalPage= Math.ceil((await Admin.find().countDocuments())/size);
        return res.status(201).send({ newAdmins, totalPage });

    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }

});

router.get("/:id", async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)
        .populate({path:"user_id", select:"first_name,last_name"})
        .lean()
        .exec();
        res.send({ admin });

    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }

});

module.exports =router; 