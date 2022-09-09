import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from 'interfaces/interfaces';
import Card from '../models/card';

export const createCard = (req: any, res: Response) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  return Card.create({name, link, owner})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка'}))
};

export const deleteCard = (req: Request, res: Response) => {
  return Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const getAllCards = async (req: Request, res: Response) => {
  return await Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

export const putCardLike = (req: any, res: Response) => {
  return Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true },)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const deleteCardLike = (req: any, res: Response) => {
  return Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true },)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};