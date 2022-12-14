import { Router } from 'express';
import idValidation from '../utils/validation';
import {
  createUser,
  getUser,
  getAllUsers,
  patchProfile,
  patchProfileAvatar,
  login,
  getCurrentUser,
} from '../controllers/users';

const { celebrate, Joi } = require('celebrate');

const router = Router();
const user = Router();

user.get('/', getAllUsers);
user.get('/me', getCurrentUser);

user.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
}), patchProfile);

user.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^((http|https):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
  }),
}), patchProfileAvatar);

user.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(idValidation, 'custom validation'),
  }),
}), getUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(/^((http|https):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), createUser);

export { router, user };
