// express를 불러옴
const express = require('express');
const res = require('express/lib/response');

// express 실행을 변수에 저장
const app = express();

// use 메서드는 요청이 들어오면 콜백
// 브라우저에서 보이진 않지만 새로고침하면 터미널에서 보인다.

/* app.use((req, res) => {
  console.log('유즈 사용하기');
  // request 요청
  //console.dir(req);

  // http 응답을 보냄
  //res.send("<h1>안녕하세요</h1>");

  // javascript로 보내기
  res.send({ color: 'red' }); // JSON으로 변환되어 나타난다.
});
 */

//express 실행
// app.listen(3000, (e) => {
//   console.log("LISTENING ON PROT 3000");
// });

/* 라우팅 해보기 */
// /cats => 'meow'
// /dogs => 'woof'
// '/'

app.post('/cats', (req, res) => {
  res.send('Hello');
});

app.get('/cats', (req, res) => {
  console.log('CAT Requset');
  res.send('<h1>Hello</h1>');
});

app.get('/dogs', (req, res) => {
  console.log('Woof!!');
  res.send('Woooooooof!!');
});

app.get('/', (req, res) => {
  console.log('Home');
  res.send('<h1>Home</h1>');
});

// :를 사용해서 패스 설정하기
app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  console.log(subreddit);
  res.send(`<h1>Browsing the: ${subreddit}</h1>`);
});

// : 콜론은 변수를 나타낸다. 각 패스를 변수로 지정할 수 있다.
app.get('/r/:subreddit/:postId', (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(`<h1>Viewing Post Id: ${postId} the: ${subreddit}</h1>`);
});

/* 쿼리 스트링 사용해보기 */
app.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send(`<h1 style="color: red">Missing Path: ${q}</h1>`);
  } else {
    res.send(`<h1>Search results for: ${q}</h1>`);
  }
  console.log(req.query);
});

// 잘못된 path 경로 일때
app.get('*', (req, res) => {
  res.send(`I don't know path`);
});

app.listen(8080, (e) => {
  console.log('LISTENING ON PROT 8080');
});
