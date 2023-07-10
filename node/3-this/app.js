// 문맥context에 따라서 달라지는 this : 브라우저와의 차이점 

// function안 일때 this는 global(최상위 객체Global Ojbect)를 가리킨다.
function hello() {
  console.log(this);
  console.log(this === global); //true
}
hello(); // 글로벌

// class 일때는 this는 global이 아님. 자기자신을 가리킴, 자기참조변수 
class A {
  constructor(num) {
    this.num = num;
  }
  memberFunction() {
    console.log('--------Class---------');
    console.log(this);
  }
}

const a = new A(2);
a.memberFunction(); // A {num:2}

// Node.js 환경에서 global scope의 this는 module.exports를 가리킴 
console.log('--------global scope-------');
console.log(this); // 출력값: {}
console.log(this === module.exports); // true

