import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user?: {
    _id: string
  }
}

export interface Error {
  statusCode?: number;
  name: string;
  message: string;
}