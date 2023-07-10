// Timer와 Callstack에 관한 내용 아래 app2.js 참고
let num = 1;
// setTimeout,setInterval은 interval()처럼 call 되지 않아도
// setTimeout을 invoke 호출하면 부르면, callback함수가 스레드에서 바로 실행된다.

// 아래 코드가 바로 node app.js 하면 실행됨.
// 아래처럼 따로 const interval을 설정하는 이유는
// "clearInterval(interval)"를 작성해서 작동하기전 cancel 시키거나 하기 위해서 사용.
const interval = setInterval(() => {
  console.log(num++);
}, 1000); //node실행시, 무한정 멈추지 않고 1초마다 계속 작동한다.

setTimeout(() => {
  console.log('Timeout!');
  clearInterval(interval); //이처럼 취소시킬 수 있다.
}, 6000);
