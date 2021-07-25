const experss = require('express');
const app = experss();

app.listen(8080, () => {
  console.log('listening on 8080');
});

app.get('/list', (req, res) => {
  res.send('리스트 페이지입니다.');
});

app.get('/beauty', (req, res) => {
  res.send('뷰티용품 쇼핑 페이지입니다.');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});