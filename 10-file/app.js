const fs = require('fs');

//모든 API는 3가지 형태로 제공된다.

//비동기
// rename(...., callback(error,data)) : 필요한 앞부분 ... 일을 다한 후 callback 함수를 제공해준다.
// 보통은 error가 발생할때, 성공할때를 error와 data를 받아온다.

//동기
// renameSync(...): 블러킹이다. 따로 콜백함수 전달X, 잘못되면 끝날때 까지 다음줄로 넘어가지 않는다.
//따로 에러가 된 사항을 전달하지 않기 때문에
// 에러발생시 Error 메세지 던지고 JS엔진이 멈추는 경우를 대비해서
// Error 핸들링을 try{}... catch(){} 문으로 대처한다.
//try {renameSync(...)} catch(e){ ... }

//promise 형태로 사용 가능
// promise.rename().then.catch()

// 1 동기적으로 적은 경우
try {
  fs.renameSync('./text.txt', './text-new.txt');
} catch (error) {
  console.error(error);
}

//2 비동기
fs.rename('./text-new.txt', './text.txt', (error) => console.error(error));
console.log('hello');
//비동기라서 결과값에 hello 다음 null이 출력되는 것을 볼 수 있다.

//3 비동기
fs.promises
  .rename('./text.txt', './text-new.txt')
  .then(() => console.log('Done!'))
  .catch(() => console.log('비동기3에러'));

// 실험해 봤을때, 별로 차이가 없지만

// 2번과 3번을 같이 실행 했을때,
// 3번이 2번보다 빨리 실행할 수 있다.
// 콜백함수는 Task Queue에
// 프로미스 함수는 Micro TaskQuee에
// Promise Microtasks: Javascript 에서는 각기 다른 queue에 들어 가게 된다.
// Callback 문은 그리고 EventLoop가 보통 promise 문으로 작성된 microTask가 callbakc문을 실행하는 MacroTaskQuee보다 우선 실행한다.
// 시스템 최적화: 사용하고 있는 Runtime 환경 예)Node.js 나 JS엔진 시스템, OS 등등 내장되어있는 변수들로 실행 순서가 뒤바뀔 수 도 있다.

//Javascript의 2가지 quque

//The "macrotask" queue (also known as the "task" queue or "callback" queue):
//This queue contains tasks that are executed as a whole unit, typically after the current execution context has completed.
//Examples of macrotasks include setTimeout callbacks, I/O operations, DOM events, and requestAnimationFrame callbacks.

//The "microtask" queue (also known as the "job" queue or "promise" queue):
//This queue contains tasks that are executed at the end of each individual task in the event loop.
//Microtasks have higher priority than macrotasks and are typically used for
//Promise callbacks (.then(), .catch(), .finally()), mutation observers, and queueMicrotask().
