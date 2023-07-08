// 1번: app-file.js의 모든 데이터(./file.txt) 한번에 읽고(fs.readFile)
// 2번 : 받은 데이터(data)를 쓴다.(fs.writeFile)
// 3번: 만약 이 파일 크기가 매우큰 1TB라면, 위 코드는 실행시 시간이 굉장히 오래 걸릴 것이다.

//4번: 그래서 나온 해결책은 우리가 한번에 모든 데이터를 읽는게 아니라, 데이터를 잘라서
//5번: 스트리밍(데이터조각을 연속적으로 전송하고 읽고 쓰는 데이터 처리방식)을 통해 잘게 짤라서
//6번: 버퍼(데이터의 일부를 임시로 저장하는 메모리 공간)에 저장해두어, 재생 또는 처리(읽고 쓰는)속도에 따른 지연을 완화,안정적 데이터 전송+재생을 가능하게 한다.

const fs = require('fs');
// 스트림은 조금씩 읽어오기 때문에 event base이다.
// stream에서 조금씩 도착하면 우리에게 알려준다.
// ctrl + 클릭해서 한번 보자.
const readStream = fs.createReadStream('./file.txt', {
  highWaterMark: 64000, // default는 64kbyte 버퍼 사이즈를 결정한다. 스트림을 한번에 처리할 수 있는 크기를 결정한다.
  encoding: 'utf-8',
});

const data = [];
readStream.on('data', (chunk) => {
  // console.log(chunk);
  data.push(chunk);
  console.count('data');
});

readStream.on('end', () => {
  console.log(data.join(''));
});
readStream.on('error', (error) => {
  console.error(error);
});

// 최종판 간추린 방법

// fs.createReadStream('./file.txt', {
//   // highWaterMark: 64000, // default는 64kbyte 버퍼 사이즈를 결정한다. 스트림을 한번에 처리할 수 있는 크기를 결정한다.
//   // encoding: 'utf-8',
// })
//   .on('data', (chunk) => {
//     // console.log(chunk);
//     data.push(chunk);
//     console.count('data');
//   })
//   .on('end', () => {
//     console.log(data.join(''));
//   })
//   .on('error', (error) => {
//     console.error(error);
//   });
// //ctrl+클릭을 보면 this 자기자신을 return하기 때문에
// // 이렇게 .on 으로 chaining을 통해 코드를 간추려 줄수 있다.
