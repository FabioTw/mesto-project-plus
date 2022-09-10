import { createCard, deleteCard, getAllCards, putCardLike, deleteCardLike } from '../controllers/cards';
import { Router } from 'express';

const cards = Router();

cards.get('/', getAllCards);
cards.delete('/:cardId', deleteCard);
cards.post('/', createCard);
cards.put('/:cardId/likes', putCardLike)
cards.delete('/:cardId/likes', deleteCardLike)

export default cards;