import express from 'express';
import postRouter from './routes/post.js';
import userRouter from './routes/user.js';

const app = express();

app.use(express.json()); // REST API -> Body
//urlencoded는 HTML에서 FORM이라는 요소에서 SUBMIT을 하게 되면 REQUEST가 발생하게 되는데,
// HTML에서 발생한 데이터를 자동으로 인코딩해서 req.body에 넘겨준다.
// 그래서 serverside Rendering에 유용할 수 있다.
app.use(express.urlencoded({ extended: false })); // HTML Form -> Body

//이전에 public에 있는 index.html을 받아서 client로 넘기려면 아래와 같이
app.get('./index.html', (req, res) => {
  //res에 파일을 받아서 넘기는 작업을 해야 했는데, 아래 app.use(express.static)을 사용하면
});
// 바로 client측에서 url만 typing하면 해당 파일과 서버에 접근이 가능하다.
const options = {
  dotfiles: 'ignore', //숨겨진 파일 안보이게
  etag: false,
  index: false,
  maxAge: 'id', //캐쉬 가능시간
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now()); //헤더에 필요한 데이터 추개해서 보내기
  },
};
// 옵션도 설정할 수 있다.
app.use(express.static('public', options));
//예를 들어 client에서  http://localhost:8080/index.html 이렇게 typing하면 바로 접근 가능
// express 공식문서 확인하세요.

app.use('/posts', postRouter);
app.use('/user', userRouter);

app.listen(8080);
