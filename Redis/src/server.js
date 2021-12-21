const connect=require("./config/db");
const app=require(".")

app.listen(6565, async (req, res) => {
    await connect();
    console.log("Listening on port 6565"); 
});

