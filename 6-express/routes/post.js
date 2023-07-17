import express from 'express';

const router = express.Router();
const app = express();

router.get('/all', (req, res) => {
  res.status(200).send('GET:/POSTS');
});

app.post('/', (req, res) => {
  res.status(201).send('POST:/POSTS');
});

app.put('/:id', (req, res) => {
  res.status(201).send('PUT:/posts/:id');
});

app.delete('/:id', (req, res) => {
  res.status(200).send('DELETE:/posts/:id');
});
export default router;
