const fs = require('fs');

// 디폴트 값을 지정해야함
const folderName = process.argv[2] || 'Project';

// fs.mkdir('Dogs', { recursive: true }, (err) => {
//   console.log('In the callback');
//   if (err) throw err;
// });

// 비동기 폴더 만들기
try {
  fs.mkdirSync(folderName);
  fs.writeFileSync(`${folderName}/index.html`);
  fs.writeFileSync(`${folderName}/app.js`);
  fs.writeFileSync(`${folderName}/style.css`);
} catch (e) {
  console.log(e);
  console.log('error!');
}
