const bcrypt = require('bcrypt');

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 12);
console.log(`password:${password}, hashed: ${hashed}`);
// 해쉬hased 내부에 slat와cost값 모두 들어 있기 때문에 비교가
const result = bcrypt.compareSync(password, hashed);
console.log(result);
