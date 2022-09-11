import { Request, Response } from 'express';
import cards from './routes/card';
import auth from './middlewares/auth';
import { router, user } from './routes/users';
import { Error } from './interfaces/interfaces';
import { SERVER_ERROR } from './errors/errors_status';

const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use('/', router);

app.use(auth);
app.use('/users/me', user);
app.use('/cards', cards);

app.use((err: Error, req: Request, res: Response) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(+PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
