const connect= require("./config/db");
const app=require("./index")

app.listen(5000, async ()=>{
    await connect();
    console.log("Listening on port 5000"); 
})