import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IGetUserAuthInfoRequest extends Request {
  user?: {
    _id: string | JwtPayload
  }
}

export interface Error {
  statusCode?: number;
  name: string;
  message: string;
}
