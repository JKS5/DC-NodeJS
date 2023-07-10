const fs = require('fs');

// Node.js를 사용하기위해 RAM에 할당된 Node.js의 메모리사이즈  resident set size
const beforeMem = process.memoryUsage().rss;
//기본으로 적으면 byte, (1024)로 나누면KB, (1024*1024)로 나누면 MB, (1024*1024*1024)면 GB

//파일읽기
fs.readFile('./file.txt', (_, data) => {
  //파일 쓰기
  fs.writeFile('./file2.txt', data, () => {}); // 쓰기
  //CALCUATE
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  // 두번 나눴으니 MB 단위로 읽으면 됨
  const consumed = diff / 1024 / 1024;

  console.log(diff);
  console.log(`Consumed Moery ${consumed}MB`);
});

//! node app-file.js 실행시 주의점
//시행할때 현재 경로의 ./file.txt를 찾기 때문에 실행 경로를 잘 설정하자.
// ex ) 만약 현재 경로가 Node.JS라면 밑에 ./file.txt를 ./12-stream/file.txt로 적고
// node 12-stream/file.txt라 적기.
