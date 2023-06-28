// export와 require

//아래 count에서 export 확인
const counter = require('./counter');

counter.increase();
counter.increase();
console.log(counter.getCount());
