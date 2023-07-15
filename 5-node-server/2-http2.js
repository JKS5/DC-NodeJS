const http = require('http');

const fs = require('fs');

const server = http.createServer((req, res) => {
  // console.log('hi');
  // console.log(req.url);
  // console.log(req.httpVersion);
  // console.log(req.method);
  // console.log(req.headers);
  const url = req.url;
  if (url === '/') {
    //readFile을 사용하고 싶은 경우
    //readFile은 void를 return함.
    // fs.readFile('./html/index.html', 'utf-8', (err, data) => {
    //   if (err) {
    //     res.writeHead(500);
    //     res.end('Error loading file');
    //     return;
    //   }
    //   res.setHeader('Content-Type', 'text/html');
    //   res.write(data);
    //   res.end();
    // })용
    //강의내용
    res.setHeader('Content-Type', 'text/html');
    //createReadStream은 readStream을 return함
    fs.createReadStream('./html/index.html').pipe(res);
  } else if (url === '/course') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Academy</title></head>');
    res.write('<body><h1>Course!</h1></body>');
    res.write('<html/>');
  } else {
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./html/NotFound.html').pipe(res);
  }
  // res.end();
});

server.listen(8080);
