const Product = require("../models/product.models");
const express = require("express");
const router = express.Router();
const redis = require("../config/redis");

router.post("/", async (req, res) => {
    try {

        const product = await Product.create(req.body);

        return res.status(201).json({ product });
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.get("/", async (req, res) => {
    try {
            const products = await Product.find().lean().exec();
            return res.render( "products/all",{
            products,
            });
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }

});

router.get("/:id", async (req, res) => {
    try {
            const product = await Product.findById(req.params.id).lean().exec();
            return res.render( "products/single",{
            product,
            });
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }

});

module.exports = router;