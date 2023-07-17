import express from 'express';
const app = express();

app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    res.send('firstsend');
    //send는 두번 쓰면 에러가 발생한다.
    // res.send('firstsend2');

    //무조건 return을 해줘야 한다.
    next();
  },
  (req, res, next) => {
    console.log('first2');
    next();
  }
);
app.get('/', (req, res, next) => {
  console.log('second');
});
//이 경로에 한해서만 처리한다. /api/alksfjla 라고 적으면 작동하지 않는다.
// '/api/*' 이렇게 적어줘도 된다.
app.all('/api', (req, res, next) => {
  console.log('all');
  next();
});
// sky/lasjflas 경로를 포함한 어떠한 뒤 경로에 대해서도 대처가능하다.
app.use('/ski', (req, res, next) => {
  console.log('all');
  next();
});
//만약 잘못된 경로에 들어오면 app.use를 이용해서 아무것도 처리가 되지않고 여기까지 온 것들을 처리하기위해 app.use와 404 상태코드로 처리해준다.
app.use((req, res, next) => {
  res.status(404).send('Not avaiable!@_@');
});
// 마지막에는 무조건 에러를 처리하는 error handler를 만들어 주어야 합니다.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Sorry,try later');
});
app.listen(8080);
