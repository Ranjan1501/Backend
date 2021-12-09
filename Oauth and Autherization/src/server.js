const app = require("./index");
const connect = require("./configs/db");

app.listen(4500, async function () {
  await connect();
  console.log("listening on port 4500");
});
