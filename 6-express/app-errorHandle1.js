// 에러처리의 모든 것 (동기,비동기)
import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

// localhost에 file을 요청하면 비동기적인 callback함수에서 file을 읽어오지 못하는 상황에서
// 아래와 같이 err를 설정하면 된다.
app.get('/file', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
  });
});
// sync라는 것은 파일을 읽었다가 동기적으로 데이터를 보내준다.
// 서버에서 동기적으로 데이터를 읽어오는 것은 좋지 않지만, 이런 경우 에러처리를 해줘야 한다.
// 그래서 제일 마지막에 app.use를 이용해서 최종적으로 에러 핸들링을 해준다.
// 하지만 사용자가 요청한 데이터에 따라 에러 메시지를 작성해주는게 좋다. 아래와 같이 try catch 문으로
app.get('/file1', (req, res) => {
  const data = fs.readFileSync('/file1.txt');
  res.send(data);
});
//위 코드를 아래 코드처럼 try catch 문으로 작성한 동기적 에러 핸들링
app.get('/file1', (req, res) => {
  try {
    const data = fs.readFileSync('/file1.txt');
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});
//promise 비동기적 방식: 여기 promise에서도 error 처리를 하지 않았다.
// 이경우 에러가 발생하면 node 서버가 중지될 수 있다. 그래서 catch()를 적어줘야 한다.
// catch()가 없을때, 맨 아래 app.use에 적어준 에러 핸들링으로 처리를 하지 않는 이유는?
// fsAsync가 비동기적으로 작동하기 때문에 모든 미들웨어들이 다 동기적으로 작동한 이후에, 이 fsAsync라는 비동기처리가 마무리 되어서
// 가장 마지막에 적은 에러 핸들링용 미들웨어가 작동한 이후 에러를 발생시켜서 에러처리를 제대로 하지 못하게 된다. 그래서 비동기 promise문 안에
// 직접 catch() 를 작성해서 에러 핸들링을 해줘야한다.
app.get('/file2', (req, res) => {
  //fsAsync === fs.promises
  // version 5에서도 return을 붙여 줘야지 마지막 에러헨들링 미들웨어가 실행된다.
  // 왜냐하면 file3의 경우는 앞에 async가 있어서 promise 객체를 반환하지만,
  // /file2 를 찾는 callback 함수는 함수 내부에 fsAsync가 있기때문에 에러가 발생했을때
  // catch도 없는 상태에서 비동기적 코드가 에러 발생하면 아무것도 return해 주지 않기 때문에 express js에서 무슨일이 일어나는지 알 수 없다.
  // return fsAsync를 붙여주자.
  fsAsync
    .readFile('/file2.txt') //
    .then((data) => res.send(data))
    //이 경우는 직접 해야함.
    .catch((error) => res.sendStatus(404));
});
//비동기적으로 작동하지만, 동기적인 것 처럼 보이게 하는 이 코드를 사용
app.get('/file3', async (req, res) => {
  // 여기서도 모든 비동기 처리는 밑에 app.use가 끝나고 비동기가 실행되면서 에러가 발생할 수 있기 때문에, 이 거의 무조건 try.catch로 처리한다. 아래와 같이 처리한다.
  try {
    const data = await fsAsync.readFile('/file2.txt');
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});

// 마지막에 위 동기적 처리를 모두 끝내고 나서 나머지 throw된 error 등 마지막 요청 및 에러를 처리하는 에러 핸들링 미들웨어
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something is Wrong ' });
});
// 만약 비동기에도 에러핸들링 미들웨어가 작동하게 하고 싶다면?, 마지막 보험을 들고 싶다면 현재 express v5 beta 에는 사용가능하다.

app.listen(8080);
