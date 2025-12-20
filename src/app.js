const express = require("express");

const app = express();

const User = require("./Routes/User");

app.use(express.json());
app.use("/", User);

app.get("/", (req, res) => {
  res.send("welcome this is home page");
});

app.listen(3000, () => {
  console.log(`server is running at port 3000`);
});
