const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  res.render('subreddit', { subreddit });
});

app.get('/random', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;

  //html로 값을 전달
  res.render('random', { random: num });
});

app.listen(3000, () => {
  console.log('Port 3000');
});
