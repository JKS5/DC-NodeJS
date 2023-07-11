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

// 1번: 위 코드를 보면 모든 데이터(./file.txt) 한번에 읽고(fs.readFile)
// 2번 : 받은 데이터(data)를 쓴다.(fs.writeFile)
// 3번: 만약 이 파일 크기가 매우큰 1TB라면, 위 코드는 실행시 시간이 굉장히 오래 걸릴 것이다.

//4번: 그래서 나온 해결책은 우리가 한번에 모든 데이터를 읽는게 아니라, 데이터를 잘라서
//5번: 스트리밍(데이터조각을 연속적으로 전송하고 읽고 쓰는 데이터 처리방식)을 통해 잘게 짤라서
//6번: 버퍼(데이터의 일부를 임시로 저장하는 메모리 공간)에 저장해두어, 재생 또는 처리(읽고 쓰는)속도에 따른 지연을 완화,안정적 데이터 전송+재생을 가능하게 한다.

//! node app-file.js 실행시 주의점
//시행할때 현재 경로의 ./file.txt를 찾기 때문에 실행 경로를 잘 설정하자.
// ex ) 만약 현재 경로가 Node.JS라면 밑에 ./file.txt를 ./12-stream/file.txt로 적고
// node 12-stream/file.txt라 적기.
