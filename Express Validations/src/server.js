const connect=require('./config/db');
const express = require('express');


const app = express();
app.use(express.json()); 


const usersController = require('./controllers/users.controller');
app.use("/users",usersController);



const start=async ()=>{
    await connect(); 
    app.listen(4500, async(req,res)=>{
        console.log('Listening on port 4500'); 
    }); 
};
module.exports =start;