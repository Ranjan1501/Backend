const express=require('express');
const app = express();
const {register,login}=require("./controllers/auth.controllers");
const movieController=require("./controllers/movie.controllers")
const screenController=require("./controllers/screen.controllers");
const seatController=require("./controllers/seat.controllers");
const showController=require("./controllers/show.controllers");
const theatreController=require("./controllers/theatre.controllers")

app.use(express.json());
app.post("/register", register);
app.post("/login", login);
app.use("/movies", movieController);
app.use("/screens",screenController);
app.use("/shows", showController);
app.use("/seats", seatController);
app.use("/theatres",theatreController);

module.exports =app; 