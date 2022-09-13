import {Router} from 'express';
import { authController } from './auth.controller';

const router = Router();
const authRouter = Router();

router.use('/auth', authRouter);

export {router as authRouter}