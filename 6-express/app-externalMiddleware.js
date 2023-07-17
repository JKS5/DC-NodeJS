// 유용한 외부 라이브러리 : cookie-parser, morgan, helmet
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // 쿠키를 손쉽게 가져올 수 있다.
import morgan from 'morgan'; // 사용자가 요청을 보낼때 어떤 요청을 보냈는지 요청과 응답(logging)을 확인하기 위해 일일히 코드 적어서 확인하는 작업을 간소화
import helmet from 'helmet';

const app = express();
const corseOption = cors({
  origin: ['http://127.0.0.1:5500'],
  optionsSuccessStatus: 200,
  credentials: true,
  maxAge: 3000,
});
// 사용하는 미들웨어들
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined')); // morgan 내부에는 어떤 format을 사용할 것인지 만들수 있음. combined,tiny,dev,common
app.use(helmet()); //공통적으로 보안에 필요한 header를 추가해준다. DevTool의Network의Headers 확인 => X-content-type-options ,... X-xss-protection등
app.use(corseOption);

app.get('/', (req, res) => {
  //morgan이 없다면 아래와 같이 get메소드를 받았고, req.method,시간, browser정보 등 직접적어줘햐한다.
  // console.log('GET'+ req.method);

  console.log(req.body); // app.use(express.json)을 통해 바로 body(payload)를 받을 수 있게 만듦
  console.log(req.cookies);
  //접근은 req.cookies.yummy_cookie; 로 접근
  res.send('Welcome!');
});
app.listen(8080);

//morgan에서 받은 데이터
// ::1 - - [17/Jul/2023:05:11:35 +0000] "GET / HTTP/1.1" 304 - "http://127.0.0.1:5500/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
//Morgan에서 준 해석 내용
//::1: 클라이언트의 IP 주소를 나타냅니다. ::1은 IPv6 루프백 주소로, IPv4에서의 127.0.0.1과 동일한 의미입니다. 따라서, 이 요청은 로컬호스트(localhost)에서 온 것을 나타냅니다.
//-: 원격 사용자의 식별자를 나타냅니다. 일반적으로 사용되지 않으며, -로 표시될 수 있습니다.
//[17/Jul/2023:05:11:35 +0000]: 로그가 생성된 날짜와 시간을 나타냅니다. 해당 예시에서는 2023년 7월 17일 05시 11분 35초 UTC 시간을 나타냅니다.
//"GET / HTTP/1.1": 수행된 HTTP 요청 메서드, 요청된 URL 및 HTTP 버전을 나타냅니다. 해당 예시에서는 GET 메서드로 루트 경로(/)를 요청한 것을 나타냅니다. HTTP 버전은 1.1입니다.
//304: 서버의 응답 상태 코드를 나타냅니다. 여기서는 304로 표시되며, 이는 "Not Modified" 상태를 의미합니다. 클라이언트에게 캐시된 버전의 리소스가 아직 유효하다는 것을 알려줍니다.
//-: 응답 바이트 크기를 나타냅니다. 해당 예시에서는 -로 표시되며, 이는 응답이 본문을 포함하지 않음을 의미합니다.
//"http://127.0.0.1:5500/": 요청된 페이지의 이전 URL을 나타냅니다. 해당 예시에서는 http://127.0.0.1:5500/로 표시되며, 이는 이전 페이지가 http://127.0.0.1:5500/에 위치해 있음을 나타냅니다.
//"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36": 클라이언트의 사용자 에이전트(User Agent)를 나타냅니다. 해당 예시에서는 Chrome 브라우저를 사용하는 Windows 운영체제에서 실행된 것을 나타냅니다.
