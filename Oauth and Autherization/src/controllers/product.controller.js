const express = require("express");

const Product = require("../models/product.model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const user = req.user;

      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        image_urls: ["www.google.com"],
        user: user.user._id,
      });


      return res.status(201).json({ product });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const products = await Product.find().lean().exec();

  return res.send(products);
});

router.patch("/:id", async (req, res) => {
  try{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
  
    return res.status(200).json({ product });
  } catch(e){
    return res.status(500).json({ status: "failed", message:e.message });
  }
  
});

router.delete("/:id", async (req, res) => {
  try{
    const product = await Product.findByIdAndDelete(req.params.id, {
      new: true,
    })
      .lean()
      .exec();
  
    return res.status(200).json({ product });
  } catch(e){
    return res.status(500).json({ status: "failed", message:e.message });
  }
  
});



module.exports = router;
