const express = require("express");

const app = express();

const UserRouter = require("./Routes/User");
const connectDb = require("./config/database");

app.use(express.json());
app.use("/", UserRouter);

// app.use("/", (req, res) => {
//   res.send("welcome this is home page");
// });

app.use("/home/:id/:name", (req, res) => {
  console.log(req.params);
  res.send("jdjsjsjs");
});

app.use("/home", (req, res) => {
  console.log(req.query);
  res.send("home");
});

app.get(
  "/test",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    console.log(req.query);
    res.json(JSON.stringify(req.query));
  }
);

app.get("/test/:name/:age", (req, res, next) => {
  console.log(req.params);
  res.send("response");
});

connectDb()
  .then((data) => {
    app.listen(3000, () => {
      console.log(`server is running at port 3000`);
    });
  })
  .catch((err) => {
    console.log("got error");
  });
