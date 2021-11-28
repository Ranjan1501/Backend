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

// user Schema 

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },


}, {
    versionKey: false,
    timestamps: true,
});

const User = mongoose.model("user", userSchema);

// checkedIN Schema

const checked_InSchema = new mongoose.Schema({
    book_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true,
            unique: true,
        },
    ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

const CheckedIn = mongoose.model("checked_In", checked_InSchema);

// checkedOut Schema

const checked_OutSchema = new mongoose.Schema({
    checked_In_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "checked_In",
            required: true,
           
        },
    ],
  
}, {
    versionKey: false,
    timestamps: true,
});

const CheckedOut = mongoose.model("checked_Out",checked_OutSchema);



const express = require('express');
const app = express();
app.use(express.json());


// user Crud

app.post("/users", async (req, res) => {
    try {
        const users = await User.create(req.body);
        return res.status(201).send({ users });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.get("/users", async (req, res) => {

    try {
        const users = await User.find().lean().exec();
        return res.status(200).send({ users });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(200).send({ user });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec();
        return res.status(200).send({ user });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send({ user });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});

// books Crud
app.post("/books", async (req, res) => {
    try {
        const newBooks = await Book.create(req.body);
        return res.status(201).send({ newBooks });
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
    try {
        const book = await Book.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send({ book });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});

// CheckedIn Crud
app.post("/checked_Ins", async (req, res) => {
    try {
        const checked_Ins = await CheckedIn.create(req.body);
           
        
        return res.status(201).send({ checked_Ins });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });

    }

});

app.get("/checked_Ins", async (req, res) => {

    try {
        const checked_Ins = await CheckedIn.find()
            .populate({ path: "book_ids", select: "book_name" })
            .populate("user_id")
            .lean().exec();
        return res.status(200).send({ checked_Ins });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.get("/checked_Ins/:id", async (req, res) => {
    try {
        const checked_In = await CheckedIn.findById(req.params.id).lean().exec();
        return res.status(200).send({ checked_In });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.patch("/checked_Ins/:id", async (req, res) => {
    try {
        const checked_In = await CheckedIn.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean().exec();
        return res.status(200).send({ checked_In });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});

app.delete("/checked_Ins/:id", async (req, res) => {
    try {
        const checked_In = await CheckedIn.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send({ checked_In });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});

// CheckedOut Crud
app.post("/checked_Outs", async (req, res) => {
    try {
        const checked_Outs = await CheckedOut.create(req.body);
            
        
        return res.status(201).send({ checked_Outs });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });

    }

});

app.get("/checked_Outs", async (req, res) => {

    try {
        const checked_Outs = await CheckedOut.find()
            // .populate({ path: "checked_In_ids",select:"book_name" })
            .lean().exec();
           
        return res.status(200).send({ checked_Outs });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.get("/checked_Outs/:id", async (req, res) => {
    try {
        const checked_Out = await CheckedOut.findById(req.params.id).lean().exec();
        return res.status(200).send({ checked_Out });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }

});

app.patch("/checked_Outs/:id", async (req, res) => {
    try {
        const checked_Out = await CheckedOut.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean().exec();
        return res.status(200).send({ checked_Out });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});

app.delete("/checked_Outs/:id", async (req, res) => {
    try {
        const checked_Out = await CheckedOut.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send({ checked_Out });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });

    }
});



app.listen(2455, async () => {
    await connect();
    console.log('Listening on port 2455');
});