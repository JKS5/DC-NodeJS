// 버퍼란 : 고정된 메모리 덩어리 Fixed-size chunk of memory
// 숫자의 배열, 데이터의 바이트 array of integers, byte of data

const buf = Buffer.from('Hi');
// 이렇게 출력하면 https://symbl.cc/en/alphabets/latin/
// 유니코드 형태로 출력된
console.log(buf); //<Buffter 48 69 >

console.log(buf.length);
//배열 형태로 저장되어 있는데 이렇게 출력하면 ASCII code 형태로 표현됨
console.log(buf[0]); //<2>
console.log(buf[1]); // <72>
console.log(buf.toString());

//BUffer 생성 create
//메모리에서 (숫자)만큼 값을 가져와서 초기화시킨후 사이즈가 2개인 버퍼를 만든다.
const buf2 = Buffer.alloc(2);
console.log(buf2);
buf2[0] = 72; //아스키 코드로 할당
buf2[1] = 105; // 아스키 코드

console.log(buf2.toString());

//초기화 하지 않는 버퍼 2개를 만든다. 해당 메모리에 데이터가 있다면, 다른 값이 출력될 수 있다.
const buf3 = Buffer.allocUnsafe(2); //faster
console.log(buf3);
//buffer 복사
buf2.copy(buf3);
console.log(buf2.toString());
console.log(buf3.toString());

// concat 배열이니까 묶어주기 가능
const newBuf = Buffer.concat([buf, buf2, buf3]);
console.log(newBuf.toString());
