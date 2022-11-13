const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

// form urlencoded로 받기
app.use(express.urlencoded({ extended: true }));

// json 으로 받기
app.use(express.json());

app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

let comments = [
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

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  // patch와 put의 다른점은 patch는 개별로 변경할때 사용, put은 전체를 변경헐때 사용.
  // patch에만 페이로드가 적용된다.
  const { id } = req.params;
  //const comment = comments.find((c) => c.id === id);
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
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
