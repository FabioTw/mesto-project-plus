import { NextFunction, Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../interfaces/interfaces';
import NotFoundError from '../errors/not-found-err';
import Card from '../models/card';
import BadRequestError from '../errors/bad-request-err';
import ForbiddenError from '../errors/forbidden-err';

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

export const deleteCard = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const id = req.user?._id;
  try {
    const card = await Card.findById(cardId);
    if (card === null) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }
    if (id !== card.owner.toString()) {
      throw new ForbiddenError('У Вас нет доступа.');
    }
    await Card.deleteOne({ _id: cardId });
    res.send(card);
  } catch (err: any) {
    if (err.name === 'CastError') {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
    } else {
      next(err);
    }
  }
};

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
