// 3번

const fs = require('fs');

const writeStream = fs.createWriteStream('./file3.txt');
writeStream.on('finish', () => {
  console.log('finished');
});

writeStream.write('hello!');
writeStream.write('world');
// end를 써줘야 finished가 출력된다.
writeStream.end();
