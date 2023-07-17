import express from 'express';
const app = express();

app.use(express.json());
//일반적인 미들웨어
app.get('/posts', (req, res) => {
  res.status(200).send('GET:/POSTS');
});
// 경로가 같다면 중복된다.
app.post('/posts', (req, res) => {
  res.status(201).send('POST:/POSTS');
});
// 중복을 없애고 아래와 같이 route로 묶어서 사용 할 수 있다.
app
  .route('/posts')
  .get((req, res, next) => {
    res.status(200).send('POST:/POSTS');
  })
  .post((req, res, next) => {
    res.status(200).send('POST:/POSTS');
  });

//Before
app.put('/posts/:id', (req, res) => {
  res.status(201).send('PUT:/posts/:id');
});
app.delete('/posts/:id', (req, res) => {
  res.status(200).send('DELETE:/posts/:id');
});
//After
app
  .route('/posts/:id')
  .put((req, res) => {
    res.status(200).send('PUT:/posts/:id');
  })
  .delete((req, res) => {
    res.status(204).send('DELETE/posts/:id');
  });

app.listen(8080);
