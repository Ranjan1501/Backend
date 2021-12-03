const connect=require("./config/db");
const express=require('express');



const app = express();
app.use(express.json()); 

const usersController = require('./controllers/users.controller');
app.use("/users",usersController); 
const userGallery=require("./controllers/gallery.controllers");
app.use("/galleries",userGallery);



const start=async ()=>{
    await connect(); 
    app.listen(4000, async(req,res)=>{
        console.log('Listening on port 4000'); 
    }); 
};
module.exports =start;