const mongoose = require('mongoose');



const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/test");
};

// books Schema for data  this should be same as data as it is bluePrint. 
const bookSchema = new mongoose.Schema({
    book_name: { type: String, required: true },
    author_first_name: { type: String, required: true },
    author_last_name: { type: String, required: false },
    published_year: { type: Number, required: false },
}, {
    versionKey: false,
    timestamps: true,
});

const Book = mongoose.model("book", bookSchema);

// author Schema 

const authorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    book_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true
        },
    ],
    tag_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tag",
            required: true,
        }
    ],

}, {
    versionKey: false,
    timestamps: true,
});

const Author = mongoose.model("author", authorSchema);

// tag Schema

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: true,
});

const Tag = mongoose.model("tag", tagSchema);

const express = require('express');
const app = express();
app.use(express.json());


// tag Crud

app.post("/tags", async (req, res) => {
    try {
        const tags = await Tag.create(req.body);
        return res.status(201).send({ tags });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.get("/tags", async (req, res) => {

    try {
        const tags = await Tag.find().lean().exec();
        return res.status(200).send({ tags });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.get("/tags/:id", async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id).lean().exec();
        return res.status(200).send({ tag });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.patch("/tags/:id", async (req, res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec();
        return res.status(200).send({ tag });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});

app.delete("/tags/:id", async (req, res) => {
    try{
        const tag= await Tag.findByIdAndDelete(req.params.id).lean().exec(); 
        return res.status(200).send({ tag}); 
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
}); 

// books Crud
app.post("/books", async (req, res) => {
    try {
        const newBooks = await Book.create(req.body);
        return res.status(201).send({newBooks });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });

    }

});

app.get("/books", async (req, res) => {

    try {
        const books = await Book.find().lean().exec();
        return res.status(200).send({ books });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean().exec();
        return res.status(200).send({ book });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.patch("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        .lean().exec();
        return res.status(200).send({ book });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});

app.delete("/books/:id", async (req, res) => {
    try{
        const book= await Book.findByIdAndDelete(req.params.id).lean().exec(); 
        return res.status(200).send({ book}); 
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
}); 

//Author Crud
app.post("/authors", async (req, res) => {
    try {
        const authors = await Author.create(req.body);
        return res.status(201).send({authors });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });

    }

});

app.get("/authors", async (req, res) => {

    try {
        const authors = await Author.find()
        .populate({path:"book_ids",select:"book_name"})
        .populate("tag_ids")
        .lean().exec();
        return res.status(200).send({ authors });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.get("/authors/:id", async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).lean().exec();
        return res.status(200).send({ author });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.patch("/authors/:id", async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        .lean().exec();
        return res.status(200).send({ author });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});

app.delete("/authors/:id", async (req, res) => {
    try{
        const author= await Author.findByIdAndDelete(req.params.id).lean().exec(); 
        return res.status(200).send({ author}); 
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
}); 






app.listen(2455, async () => {
    await connect();
    console.log('Listening on port 2455');
});