let count = 0;

function increase() {
  count++;
}

function getCount() {
  return count;
}

//다른 파일(모듈)에 접근시켜주기 위해서는 해당 파일(모듈)에서 어떤것을
//노출 시켜줄것인지 export를 사용해야 한다.
module.exports.getCount = getCount;

module.exports.increase = increase;
// 처음 exports는 module.exports를 가리키고 있기 때문에 위와 아래가 똑같다.
exports.increase = increase; // 그냥 exports 쓰기

// 하지만, exports는 module export의 참조값을 가지고 있기 때문에
exports = {}; // 이렇게 적은 코드가 상단에 적고 하면 에러가 발생한다.
