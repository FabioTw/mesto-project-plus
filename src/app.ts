const express = require('express');
const mongoose = require('mongoose');
import router from './routes/users';
// import express, {Request, Response} from 'express';
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json())
app.use('/', router);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6318d207fc3d0ea816906821'
//   };

//   next();
// })

app.listen(+PORT, () => {
  console.log(`App listening on port ${PORT}`)
})