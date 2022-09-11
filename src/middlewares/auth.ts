import { Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../interfaces/interfaces';

export default (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '631c91830cc739472e13f71e',
  };

  next();
};
