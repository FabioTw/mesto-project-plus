import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../errors/not-found-err';
import { IGetUserAuthInfoRequest } from '../interfaces/interfaces';
import User from '../models/user';
import BadRequestError from '../errors/bad-request-err';
import ConflictError from '../errors/conflict-error';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash: string) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user: any) => res.send({ data: user }))
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError':
          next(new BadRequestError('Переданы некорректные данные'));
          break;
        case 'MongoServerError':
          next(new ConflictError('Пользователь с такой почтой уже существует'));
          break;
        default: next(err);
      }
    });
};

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((user) => res.send({ data: user }))
  .catch(next);

export const getCurrentUser = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const id = req.user?._id;

  User.findById(id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

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
      next(new NotFoundError('Пользователь по указанному _id не найден.'));
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

export const login = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const { JWT_SECRET } = process.env;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        `${JWT_SECRET}`,
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(next);
};
