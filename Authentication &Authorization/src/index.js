const express=require('express');


const {register,login} = require('./controllers/auth.controllers');
const postController = require("./controllers/post.controllers");
const app = express();
app.use(express.json()); 


app.post("/register",register);

app.post("/login",login);
app.use("/posts",postController);

module.exports =app; 