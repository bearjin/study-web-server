간단한 웹서버 만들어 보기(Node.js + Express + MongoDB)

# Node.js
- Non-blocking 덕분에 많은 요청을 받을 수 있고 완료 되는 것들부터 결과를 전달하기 때문에 채팅/SNS 등과 같은 서비스에서 많이 사용
- 코드가 매우 짧고 쉬워서 빠른 개발이 가능
- 웹 서비스에서 주로 사용

# Express
1. 서버를 띄우기 위한 기본 세팅(express)
```javascript
const experss = require('express');
const app = experss();

app.listen();
```

2. GET 요청 처리하기 - 내용 보여주기
- 사용자가 해당 경로로 접근 할 경우 서버에 GET요청을 보냅니다.
- .get('경로', (요청, 응답) => {});
```javascript
app.get('경로', (요청, 응답) => {
  응답.send('보여줄 내용');
});
```

3. 서버 재실행 자동화 하기
- nodemon 라이브러리 설치 서버 재실행만 해주는 라이브러리
- 실행 시 오류가 나는 경우 관리자권한으로 PowerShell 실행 후   
1. executionpolicy 입력
2. set-executionpolicy unrestricted
3. y 입력
```javascript
// 설치
npm i -g nodemon

// 실행
nodemon 실행할 파일
```

4. GET 요청 처리하기 - 파일 보여주기
```javascript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
```