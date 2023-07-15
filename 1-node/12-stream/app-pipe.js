// 파이핑, 읽어온(createReadStream)데이터를 쓰는것(createWriteStream)연결하는작업

const fs = require('fs');

//node.js에서 제공하는 압축 가능하게 만드는 모듈
const zlib = require('zlib');

const readStream = fs.createReadStream('./file.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./file4.zip');
const piping = readStream.pipe(zlibStream).pipe(writeStream);

piping.on('finish', () => {
  console.log('done');
});
//이런 위 pipeline은 나중에 서버를 만들때 유용하게 사용 가능하다.
// 서버를 만들고 파일을 한번에 읽어서 리소스 데이터를 보내는 것 보다는
const http = require('http');
const server = http.createServer((req, res) => {
  //이렇게 파일을 다 읽은 다음에 데이터를 보내주기 보다는
  // fs.readFile('file.txt', (err, data) => {
  //   res.end(data);
  // });

  //스트림 자체를 response에서 자체에서 연결해주면 좋다.
  const stream = fs.createReadStream('file.txt');
  stream.pipe(res);
});
server.listen(3000);

// 참고
//https://nodejs.org/api/stream.html#readablepipedestination-options
//pipe는 stream의 메소드이다.
