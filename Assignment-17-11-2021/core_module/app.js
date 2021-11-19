const express = require('express');
const app = express();
const users = require("../users.json");
app.use(express.json()); 


app.get("/", (req, res) => {
    res.send({users});


});


app.listen(4500, function () {
    console.log("listening on port 4500");
});
