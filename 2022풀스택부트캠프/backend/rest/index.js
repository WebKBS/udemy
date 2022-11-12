const express = require("express");
const app = express();

// form urlencoded로 받기
app.use(express.urlencoded({ extended: true }));

// json 으로 받기
app.use(express.json());

app.get("/tacos", (req, res) => {
  res.send("Get /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Ok, ${qty}, ${meat}`);
});

app.listen(3000, () => {
  console.log("Port 3000");
});
