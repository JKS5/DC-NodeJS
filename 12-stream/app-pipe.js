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
const http = require('http');
const server = http.createServer((req, res) => {
  fs.readFile;
});
