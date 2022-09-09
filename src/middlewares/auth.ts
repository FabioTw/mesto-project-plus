import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from 'interfaces/interfaces';

export default (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6318d207fc3d0ea816906821'
  };

  next();
}