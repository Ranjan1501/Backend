const express = require('express');

const connect = require('./config/db');

const usersController = require('./controllers/user.controller');
const topicsController = require('./controllers/topic.controller');
const studentsController = require('./controllers/student.controller');
const evaluationsController = require('./controllers/evaluation.controller');


const app = express();
app.use(express.json()); 
app.use("/users",usersController);
app.use("/topics",topicsController);
app.use("/evaluations",evaluationsController);
app.use("/students",studentsController);

module.exports=app; 







