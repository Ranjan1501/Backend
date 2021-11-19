const express = require('express');
const app = express();
const books = require("./books.json")
app.use(express.json());

const authorise = (permission) => {
    return (req, res, next) => {
        const sendResponse = res.send.bind(res)
        res.send = function (body) {
            body.name = { "api_requested_by": "Ranjan Kumar Thakur" };
            return sendResponse(body);
        };
        next();
    };
};

app.get("/", authorise("finance"), (req, res) => {
    res.send({ books });    // json response  if required in array then write without {}

});

app.post("/books", authorise("finance"), (req, res) => {
    const newBook = [...books, req.body];
    res.send({ newBook });
});

app.get("/books/:id", authorise("finance"), (req, res) => {
    const newBook = books.filter((book) => Number(book.id) === Number(req.params.id));
    res.send({ newBook });

});

app.patch("/books/:id", authorise("finance"), (req, res) => {
    const newBook = books.map((book) => {
        if (Number(req.params.id) === Number(book.id)) {
            if (req?.body?.Book_Name) book.Book_Name = req.body.Book_Name
            if (req?.body?.id) book.id = req.body.id
            if (req?.body?.Author_Name) book.Author_Name = req.body.Author_Name
            if (req?.body?.Pages) book.Pages = req.body.Pages
            if (req?.body?.Published_Year) book.Published_Year = req.body.Published_Year

        }
        return book;
    });
    return res.send({ newBook });

});

app.delete("/books/:id", authorise("finance"), (req, res) => {
    const newBook = books.filter((book) => Number(book.id) !== Number(req.params.id));
    res.send( {newBook});

});



app.listen(4000, () => {
    console.log('listening on Port 4000');
});