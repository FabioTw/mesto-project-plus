import { createUser, getUser, getAllUsers } from '../controllers/users';
import { Router } from 'express';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);

export default router;