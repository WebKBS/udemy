const express = require("express");
const app = express();
const sheltersRoutes = require("./routes/shelters");
const dogRoutes = require("./routes/dogs");
const adminRoutes = require("./routes/admin");

app.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();

    //http://localhost:3000/admin/topsecret?isAdmin=true 설정해야 이동함
  }
  res.send("Sorry Not Admin");
});

app.use("/breeders", sheltersRoutes);
app.use("/dogs", dogRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, () => {
  console.log("Port 3000!!!");
});
