import {register,login} from '../controllers/auth.controller.js';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;