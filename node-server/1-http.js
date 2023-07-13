const http = require('http');
// const http2 = require('http2'); //https

const server = http.createServer((req, res) => {
  console.log('incoming');
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  const url = req.url;
  if (url === '/') {
    res.write('welcome to the world');
  } else if (url === '/courses') {
    res.write('Courses');
  } else {
    res.write('NotFound');
  }
  res.end();
});

server.listen(8080);

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);
