// 1. CommonJS (Node JS)모듈 시스템을 사용하는 프로젝트에서는 require 키워드로 불러오고,
//2. ES 모듈(자바스크립트 자체적으로 쓰는)모듈 시스템을 사용하는 프로젝트에서는 import 키워드를 사용할 수 있습니다.

//이것을 써주면 browser환경이 아니라 node.js환경인 것을 알려준다.
const fs = require('fs');

// Global 이란 (Global Object)전역객체, 모든객체의 유일한 최상위 객체
// Node.js의 global은 global
// Browser의 global은 window
console.log(global);

global.hello = () => {
  global.console.log('hello');
};

global.hello();
hello();
