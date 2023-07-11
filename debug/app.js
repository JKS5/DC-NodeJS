// 디버그 키
// 첫번쨰 : breakpoint
// stepover :코드 1줄 1줄 진행 but 다른 함수 호출시 결과를 받아서 넘어감
// step into: 함수 안으로 들어감떄
// step out:  함수 밖으로 나가고 싶을떄
function sayHello() {
  console.log('hello');
  console.log('Ellie');
}
function calculate(x, y) {
  console.log('calculating...');
  const result = x + y;
  console.log('result:', result);
  sayHello();
  return result;
}
calculate(1, 2);

const stop = 4;
console.log('...... loooping .....');
for (let i = 0; i < 10; i++) {
  console.log('count', i); //breaking point 에 edit을 이용해 i===3일떄 멈추게 가능
  if (i === stop) {
    break;
  }
}
