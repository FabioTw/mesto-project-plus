import { Router } from 'express';
import {
  createUser,
  getUser,
  getAllUsers,
  patchProfile,
  patchProfileAvatar,
} from '../controllers/users';

const router = Router();
const user = Router();

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
user.patch('/', patchProfile);
user.patch('/avatar', patchProfileAvatar);

export { router, user };
