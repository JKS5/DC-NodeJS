// 노드가 동작하고 있는 운영체제에 대한 정보를 가져올 수 있는 모듈

const os = require('os');
// ctrl + os 클릭시 다양한 정보 확인 가능

//Window의 경우
console.log(os.EOL === '\r\n');
//Mac,Linux같은 UNIX계열의 경우
console.log(os.EOL === '\n');

console.log(os.totalmem());
console.log(os.freemem());
console.log(os.type());
console.log(os.userInfo());
console.log(os.cpus());
console.log(os.homedir());
console.log(os.hostname());
