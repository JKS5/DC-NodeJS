// 현재 동작하고 있는 Process프로세스 에 대한 정보를 불러 올 수 있다.

const process = require('process');

console.log(process.execPath);
console.log(process.version);
console.log(process.pid);
console.log(process.ppid);
console.log(process.platform);
console.log(process.env);
console.log(process.uptime());
console.log(process.cwd());
console.log(process.cpuUsage());

setTimeout(() => {
  console.log('setTimeout');
}, 0);
//현재 수행되고 있는 CallStack에 코드가 다 수행된 다음에
//이 콜백함수를 taskQueue에 (제일 앞에) 넣어달라고 요청할때 쓸 수 있다.
process.nextTick(() => {
  console.log('nextTrick');
});
// for loop를 돌린다.
for (let i = 0; i < 100; i++) {
  console.log('for loop');
}

// 결과 :
//for loop 100개
//nextTrick
//setTimeout
