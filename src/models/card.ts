import mongoose from 'mongoose';

interface ICard {
  name: string,
  link: string,
  owner: mongoose.Types.ObjectId,
  likes: Array<mongoose.Types.ObjectId>,
  createdAt: Date,
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v: string) {
        // eslint-disable-next-line
        return /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/.test(v);
      },
      message: 'Неправильный формат ссылки',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<ICard>('card', cardSchema);
