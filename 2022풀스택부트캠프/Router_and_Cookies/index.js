const express = require("express");
const app = express();
const sheltersRoutes = require("./routes/shelters");
const dogRoutes = require("./routes/dogs");

app.use("/breeders", sheltersRoutes);
app.use("/dogs", dogRoutes);

app.listen(3000, () => {
  console.log("Port 3000!!!");
});
