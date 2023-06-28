// 2015년 ES6이후 추가된 JS자체적 export 문법을 사용하면 더 간단하다.

// 아래 package.json을 'npm init --yes'로 설치후
// package.json에 "type":"module"(Node JS말고 JS자체 모듈) 설정해서 ES6문법 사용하자.
let count = 0;

// 간단히 export 사용
export function increase() {
  count++;
}

//간단히 export 사용
export function getCount() {
  return count;
}
