import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../errors/not-found-err';
import { IGetUserAuthInfoRequest } from '../interfaces/interfaces';
import User from '../models/user';
import BadRequestError from '../errors/bad-request-err';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((user) => res.send({ data: user }))
  .catch(next);

export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    }

    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
    } else {
      next(err);
    }
  });

export const patchProfile = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => User.findByIdAndUpdate(
  req.user?._id,
  {
    name: req.body.name,
    about: req.body.about,
  },
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    }

    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
    } else {
      next(err);
    }
  });

export const patchProfileAvatar = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => User.findByIdAndUpdate(
  req.user?._id,
  {
    avatar: req.body.avatar,
  },
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    }

    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
    } else {
      next(err);
    }
  });
