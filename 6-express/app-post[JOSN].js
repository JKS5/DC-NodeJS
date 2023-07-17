// POST메서드로 오는 JSON payload 처리법
import express from 'express';
const app = express();
//req로 오는 json 값을 처리하기 위해
// JSON payloads를 받아온 JSON파일을 자동으로 Javascript 객체로 변환 처리하는 역할을 하는 미들웨어(함수) express.json()로 처리하기위해
//아래와 같이 app.use(express.json)이라 적고 사용한다.
//https://expressjs.com/en/4x/api.html#express.json
app.use(express.json());

app.post('/', (req, res, next) => {
  console.log(req.body);
});

app.listen(8080);
