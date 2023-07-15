const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const name = 'Patrick';
const courses = [
  {
    name: 'HTML',
  },
  {
    name: 'CSS',
  },
  {
    name: 'Javascript',
  },
  {
    name: 'Node',
  },
  { name: 'Android' },
];

const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    ejs
      .renderFile('./templateing-Engines/index.ejs', { name: name })
      .then((data) => res.end(data));
  } else if (url === '/courses') {
    ejs
      .renderFile('./templateing-Engines/courses.ejs', { courses })
      .then((data) => res.end(data));
  } else {
    ejs
      .renderFile('./templateing-Engines/NotFound.ejs', { name })
      .then((data) => res.end(data));
  }
  // res.end();
});

server.listen(8080);
