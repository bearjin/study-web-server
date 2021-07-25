const experss = require('express');
const app = experss();
const port = 8080;
const config = require('./config/key');
const { User } = require('./models/User');


// application/x-www-form-urlencoded
experss.urlencoded({ extended: true });

//application/json
experss.json();

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));






app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });

app.post('/register', (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => { console.log('listening on 8080'); });