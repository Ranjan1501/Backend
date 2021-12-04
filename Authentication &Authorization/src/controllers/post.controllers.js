const express = require('express');

const router = express.Router();
const Post = require("../models/post.models");
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, async (req, res) => {
    try {
        const user = req.user;

        const post = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user: user.user._id,
        });

        return res.status(201).json({ post });
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().lean().exec();

        return res.status(200).json({ posts });
    }

    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

module.exports = router;
