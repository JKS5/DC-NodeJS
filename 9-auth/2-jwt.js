const jwt = require('jsonwebtoken');

const secret = '0puK^#4iaE1P26JJBo2Q4Bg0cmMCDZOf';

//secret key https://www.lastpass.com/features/password-generator#generatorTool 권고되는 사이즈는 32byte = 256bit
const token = jwt.sign(
  {
    id: 'userId',
    isAdmin: false,
  },
  secret,
  { expiresIn: 2 }
);
setTimeout(() => {
  jwt.verify(token, secret, (error, decode) => {
    console.log(error, decode);
  });
}, 1);
console.log(token);
