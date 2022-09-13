import { Router } from 'express';
import { userController } from './users.controller';

const router = Router();
const userRouter = Router();

userRouter
.post('/create-new', userController.createNew)
.get('/detail', userController.findOne);
router.use('/user', userRouter);

export { router as userRouter };
