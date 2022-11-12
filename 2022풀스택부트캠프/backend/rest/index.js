const express = require("express");
const app = express();

app.get("/tacos", (req, res) => {
  res.send("Get /tacos response");
});

app.post("/tacos", (req, res) => {
  res.send("Post /tacos response");
});

app.listen(3000, () => {
  console.log("Port 3000");
});
