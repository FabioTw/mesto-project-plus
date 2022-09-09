import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка'}))
}

export const getAllUsers = async (req: Request, res: Response) => {
  return await User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

export const getUser = (req: Request, res: Response) => {
  return User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

export const patchProfile = (req: any, res: Response) => {
  return User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const patchProfileAvatar = (req: any, res: Response) => {
  return User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};
