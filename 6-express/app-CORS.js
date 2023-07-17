import express from 'express';
import cors from 'cors';
const app = express();
//cors 라이브러리를 이용한 모든 경로와 모든 메소드 허용
app.use(cors());

//우리가 배포한 도메인에만 CROSS ORIGIN RESOURCE SHARING
app.use(
  cors({
    origin: ['http://127.0.0.1:5500'], // 내가 배포한 도메인에서만 서버로 접속가능하게 허용
    optionsSuccessStatus: 200, //Options요청이 성공했을때, IE11이나 다양한 스마트 tv 같은 레거시 브라우저에서 204를 제공하는데 대신 status코드를 지정해 줄 수 있다.
    credentials: true, //Access-Control-Allow-Credentails:true 와 같다. 헤더제어,Authorization헤더, TLS클라이언트인증서 같은 자격증명들이 클라이언트에 노출
    maxAge: 3000, // Preflight 요청의 응답을 캐시하는 시간을 설정합니다. 이 값을 설정하면 Preflight 요청의 수를 줄일 수 있습니다. 여기서는 3000으로 설정되어 있으므로 3000초 동안 Preflight 요청의 응답이 캐시됩니다.
  })
);

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  // res.setHeader(
  //   'Access-Control-Allow-Methods',
  //   'OPTIONS, GET, POST, PUT, DELETE'
  // );

  next();
});

app.get('/', (req, res) => {
  res.send('Welcome!');
});
app.listen(8080);
