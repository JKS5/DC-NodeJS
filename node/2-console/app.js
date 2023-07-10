console.log('logging...');
console.clear();

//log level
console.log('log'); // 개발
console.log('info'); // 정보
console.log('warn'); // 경고
console.log('error'); // 에러, 사용자에러, 시스템 에러

//assert :참이 아닌경우만 출력
console.assert(2 === 3, 'not same');
console.assert(3 === 3, 'same!');

//print object
const student = { name: 'ellie', age: 20, company: { name: 'AC' } };
console.log(student);
console.table(student);
console.dir(student);
console.dir(student, { showHidden: true, colors: false, depth: 0 });

//measuring time :성능 측정
console.time('for loop');
for (let i = 0; i < 10; i++) {
  i++;
}
console.timeEnd('for loop');

//Counting :내가 작성한 함수가 예상한 횟수만큼 호출 되었는지 사용되었는지

function a() {
  console.count('a function');
}
a();
console.countReset('a function');
a();

//trace :디버깅에 유용한
function f1() {
  f2();
}
function f2() {
  f3();
}
function f3() {
  console.log('f3');
  console.trace();
}
f1();
