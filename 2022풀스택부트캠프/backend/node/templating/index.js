debugger;
const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

//미들웨어 사용해보기
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public'))); // 미들웨어 경로 지정

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/cats', (req, res) => {
  const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'];
  res.render('cats', { cats });
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render('subreddit', { ...data });
  } else {
    res.render('notfound', { subreddit }); // 사이트 주소가 틀릴 때
  }
});

app.get('/random', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;

  //html로 값을 전달
  res.render('random', { random: num });
});

app.listen(3000, () => {
  console.log('Port 3000');
});
