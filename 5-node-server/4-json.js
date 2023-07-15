// 순수하게 json 데이터 받아오는 방법, req.on('data', (chunk)=>{})를 사용한다.

const http = require('http');
const courses = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'Javascript' },
  { name: 'Node' },
  { name: 'Android' },
];
const server = http.createServer((req, res) => {
  const url = req.url; // what do you want?
  const method = req.method; // how?, action?

  if (url === '/courses') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(courses));
    } else if (method === 'POST') {
      const body = [];
      // postmand으로 http://localhost:8080/courses
      // body 에 JSON 으로 {"name":"yo hey hi"} 보내면
      req.on('data', (chunk) => {
        // chunk는 아직 json으로 변환하지 않은 버퍼
        console.log(chunk); //<Buffer 7b 22 6e 61 6d 65 22 3a 22 54 65 73 74 36 22 7d>
        body.push(chunk);
      });
      req.on('end', () => {
        // 여기서 버퍼를 모두 합친후, toString으로
        const bodyStr1 = ''.concat(body).toString(); // ctrl+click 해보면 concat이 앞에 문자열일때(toString()지워도 string문자열 return함),
        const bodyStr2 = [].concat(body).toString(); // [] 배열일때 concat
        const bodyStr3 = Buffer.concat(body); // Buffer일때 concat이 모두 다르다.
        const bodyStr4 = Buffer.concat(body).toString();
        console.log(bodyStr1); //{"name":"Test6"}
        console.log(bodyStr2); //{"name":"Test6"}
        console.log(bodyStr3); //<Buffer 7b 22 6e 61 6d 65 22 3a 22 54 65 73 74 36 22 7d>
        console.log(bodyStr4); //{"name":"Test6"}
        console.log(typeof bodyStr1); // stirng
        console.log(typeof bodyStr2); // string
        console.log(typeof bodyStr3); // object
        console.log(typeof bodyStr4); // string
        console.log(`bodyStr1:${bodyStr1}`); //bodyStr1:{"name":"Test6"}
        console.log(`bodyStr2:${bodyStr2}`); //bodyStr2:{"name":"Test6"}
        console.log(`bodyStr3:${bodyStr3}`); //bodyStr1:{"name":"Test6"}
        console.log(`bodyStr4:${bodyStr4}`); //bodyStr1:{"name":"Test6"}
        const bodyStr = Buffer.concat(body).toString();
        //JSON.parse 는 완전 문자열 '{"name":"Test6"}'을 원래 (객체)형태로 {name: 'Test6'}로 만들어 준다. 그래서 JSON.parse가 필요하다.
        const course = JSON.parse(bodyStr);
        console.log(course);
        courses.push(course);
        console.log(courses);
        res.writeHead(201);
        res.end();
      });
    }
  }
});

server.listen(8080);

// 질문 req.body가 undefined 인 이유는?
// 질문 이유
// JAVA 의 servlet
//  1. HttpServletRequest#getInputStream()
// 2. HttpServletRequest#getReader()
// 3. HttpServletRequest#getParameter()
// 최종적으로 getParameter()를 통해서 값에  접근할 수 있었습니다.
// req.body 치면 다 express.js 내용밖에 없네요.

//대답:
// EXPRESS JS없이 순수 Node HTTP 모듈의 방식으로는 위 설명한 방식을 사용합니다.
// 하지만 아쉽게도 Node 자체적으로 편리한 함수 하나를 제공해 주지 않아요.
// req.body 가 undefiend인 이유는
// req 오브젝트 안에 body라는 filed 자체가 없기 때문입니다.
