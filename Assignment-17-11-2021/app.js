const express = require("express");
const app = express();
const getWelcome = require("./test"); 
const welcome=getWelcome();

const users = require("./users");
app.use(express.json()); 


app.get("/", (req, res) => {
    res.send(welcome);

});

app.get("/", (req, res) => {
    res.send({users})

});


app.listen(3500, function () {
    console.log("listening on port 3500");
});