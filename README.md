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

# Mongo DB

# React
1. Real DOM vs Virtual DOM
- Real DOM은 10개의 요소 중 한가지만 변해도 모든 요소들을 다시 새로 그리지만 Virtual DOM은 10개 요소의 스냅샷을 찍어두고 그 중 하나의 요소가 변했을 때 서로의 스냅샷을 비교해 변경된 부분만 변경을 시켜줍니다.

2. CRA
- 리액트 앱을 만들기 위해서는 webpack과 babel 같은 설정들을 하나씩 해줘야 했는데 이러한 설정을 한번에 해주는 것이 CRA 입니다.

# 데이터 Flow & Axios
1. 그동안 포스트맨 프로그램으로 요청을 보내줬던것을 이젠 client 에서 요청을 Axios를 통해서 보냄.
2. Axios는 jQuery의 Ajax와 비슷하다고 생각하면 됩니다.
3. Axios를 통해 서버에 요청을 했을 때 오류가 나게 되는데 이유는 client는 3000포트이고 server는 8080로 서로 다른 포트를 가지고 있기 때문에 CORS 정책에 의해 오류가 납니다.
4. 이를 해결하기 위해는 여러가지 방법이 있고, 그중에서 Proxy방법으로 진행

## Proxy
- http-proxy-middleware 설치
```javascript
npm install http-proxy-middleware --save
```
- src 폴더에 setupProxy.js 파일 생성하여 아래 코드 추가
```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
```
1. Proxy server의 역할
- IP를 임의로 바꿔 버릴수 있습니다. 그래서 인터넷에서 접근하는 사람의 IP를 모르게 됩니다.
- 보내는 데이터도 임의로 바꿀 수 있습니다.

2. Proxy server의 기능
- 방화벽 기능
- 웹 필터 기능
- 캐쉬 데이터, 공유 데이터 제공 기능

3. Proxy server를 사용하는 이유
- 회사에서 직원들이나 집안에서 아이들 인터넷 사용제어
- 캐쉬를 이용해 더 빠른 인터넷 이용 제공
- 더 나은 보안 제공
- 이용 제한된 사이트 접근 가능