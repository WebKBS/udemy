const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");

// form urlencoded로 받기
app.use(express.urlencoded({ extended: true }));

// json 으로 받기
app.use(express.json());

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

const comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol that is so funny",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: uuid(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuid(),
    username: "onlysaywoof",
    comment: "woof woof woof",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.get("/tacos", (req, res) => {
  res.send("Get /tacos response");
});

app.post("/comments", (req, res) => {
  //console.log(req.body);
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  //res.send("IT Work"); // 이 상태로 전송했을때 새로고침을 하면 다시 post가 재 전송되서 중복이된다. redirect를 사용하자
  res.redirect("/comments"); // 데이터를 전송하고 지정한 path로 이동한다. 302
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

///////
app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Ok, ${qty}, ${meat}`);
});

app.listen(3000, () => {
  console.log("Port 3000");
});

// GET /comments - list all comments
// POST /comments - Create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comment/:id - Destroy one comment
