import { NextFunction, Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../interfaces/interfaces';
import NotFoundError from '../errors/not-found-err';
import Card from '../models/card';
import BadRequestError from '../errors/bad-request-err';

export const createCard = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const owner = req.user?._id;
  const { name, link } = req.body;

  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }

    res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
    } else {
      next(err);
    }
  });

export const getAllCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((card) => res.send({ data: card }))
  .catch(next);

export const putCardLike = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet:
      {
        likes: req.user?._id,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }

      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      } else {
        next(err);
      }
    });
};

export const deleteCardLike = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  {
    $pull:
    {
      likes: req.user?._id,
    },
  },
  {
    new: true,
  },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    }

    res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
    } else if (err.name === 'CastError') {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
    } else {
      next(err);
    }
  });
