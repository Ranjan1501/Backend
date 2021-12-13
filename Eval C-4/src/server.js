const connect=require("./config/db");
const app=require(".");

app.listen(4500, async (req, res) => {
    await connect();
    console.log("Listening on Port 4500"); 

});
