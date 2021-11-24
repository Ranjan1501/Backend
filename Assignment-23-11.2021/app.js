const express = require('express');
const mongoose = require('mongoose');


const connect = () => {
    return mongoose.connect("mongodb+srv://ranjan:ranjan123@cluster0.lzaxy.mongodb.net/assignment23", {

    });
}

const movieSchema = new mongoose.Schema({
    movie_name: { type: String, required: true, unique: true },
    movie_genre: { type: String, required: false },
    production_year: { type: Number, required: false },
    budget: { type: Number, required: true },
    id: { type: Number, required: false },
}, {
    versionKey: false,
    timestamps: true
});

const Movie = mongoose.model("movie", movieSchema);

const app = express();
app.use(express.json());

app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find({}).lean().exec();
        return res.status(201).send({ movies });
    }
    catch (e) {
        res.status(500).send({ message: e.message, status: "Failed" });

    }
});

app.post("/movies", async (req, res) => {
    try {
        const movie = await Movie.create(req.body);

        return res.status(201).send({ movie });
    }
    catch (e) {
        res.status(500).send({ message: e.message, status: "Failed" });

    }

});

app.get("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        return res.status(200).send({ movie });
    }
    catch (e) {
        res.status(500).send({ message: e.message, status: "Failed" });
    }

});

app.patch("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .lean()
            .exec();
        return res.status(200).send({ movie });
    }
    catch (e) {
        res.status(500).send({ message: e.message, status: "Failed" });
    }


});

app.delete("/movies/:id", async (req, res) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec(); 
        return res.status(200).send({ movie });
    }

    catch (e) {
        res.status(500).send({ message: e.message, status: "Failed" });
    }

});







app.listen(2222, async function () {
    await connect();
    console.log('listening on port 2222');
})