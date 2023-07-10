// 먼저 callStack에 console.log('code1'),('code2'),('code3')이 출력이 되고
//
console.log('code1');

console.time('timeout 0'); //시간 측정 시작
setTimeout(() => {
  console.log('setTimeout 0');
  console.timeEnd('timeout 0'); // 성능 시간 측정 끝
}, 0);

for (let i = 0; i < 1000; i++) {} // 고의로 시간 늘려봄.

console.log('code2');
//setImmediate는 사실상 setTimeout에 0초 설정한 것이라 보면 된다.(NodeAPI로 web browser에는 없음)
setImmediate(() => {
  console.log('setImmediate');
});

console.log('code3');
process.nextTick(() => {
  console.log('nextTick');
});
//순서 code 1,2,3 이후 nextTick, setTimeout, setImmediate
