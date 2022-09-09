const express = require('express');
const mongoose = require('mongoose');
import cards from './routes/card';
import auth from './middlewares/auth';
import {router, user} from './routes/users';

// import express, {Request, Response} from 'express';
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json())
app.use('/', router);

app.use(auth);
app.use('/users/me', user)
app.use('/cards', cards)

app.listen(+PORT, () => {
  console.log(`App listening on port ${PORT}`)
})