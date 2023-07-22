import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

app.post(
  '/users',
  [
    body('name')
      .isLength({ min: 2, max: 10 })
      .withMessage('이름이 2개에서10개 이상의 메세지가 필요'),
    body('age').notEmpty().isInt().withMessage('숫자를 입력해주세요'),
    body('email').isEmail().withMessage('이메일 입력해주세요.'),
    body('job.name').notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    console.log(req.body);

    res.sendStatus(201);
  }
);

app.get(
  '/:email',
  param('email').isEmail().withMessage('이메일 입력해요'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    res.send('email');
  }
);

app.listen(8080);
