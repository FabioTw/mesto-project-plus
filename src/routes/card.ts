import { Router } from 'express';
import idValidation from '../utils/validation';
import {
  createCard,
  deleteCard,
  getAllCards,
  putCardLike,
  deleteCardLike,
} from '../controllers/cards';

const { celebrate, Joi } = require('celebrate');

const cards = Router();

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(idValidation, 'custom validation'),
  }),
});

cards.get('/', getAllCards);
cards.delete('/:cardId', cardIdValidate, deleteCard);

cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^((http|https):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
    owner: Joi.string().required(),
  }),
}), createCard);

cards.put('/:cardId/likes', cardIdValidate, putCardLike);
cards.delete('/:cardId/likes', cardIdValidate, deleteCardLike);

export default cards;
