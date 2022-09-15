import mongoose from 'mongoose';
import NotFoundError from '../errors/not-found-err';

const idValidation = (value: string) => {
  if (!mongoose.isObjectIdOrHexString(value)) {
    throw new NotFoundError('id is incorrect.');
  }
  return value;
};

export default idValidation;
