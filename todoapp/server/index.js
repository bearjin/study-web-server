const experss = require('express');
const app = experss();
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');


// application/x-www-form-urlencoded
app.use(experss.urlencoded({ extended: true }));

//application/json
app.use(experss.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => { res.send('Hello World!!!') });

// app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });

app.post('/api/users/register', (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});


app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 탐색
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        success: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      });
    }

    // 데이터베이스에 이메일이 존재하면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ success: false, message: "비밀번호가 틀렸습니다." });

      // 비밀번호까지 맞다면 토큰을 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장 : 어디에? 쿠키, 로컬스토리지, 세션스토리지
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ success: true, userId: user._id });
      });
    });
  });
});

// role 1 기획팀 role 2 개발팀 role 3 디자인팀 :: 정하는 규칙에 따라 지정해주면 됨
app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 true라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    });
});

app.get('/api/hello', (req, res) => { res.send('axios 샘플입니다.'); });

const port = 8080;

app.listen(port, () => { console.log('listening on 8080'); });