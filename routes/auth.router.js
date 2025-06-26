import {register,login,googleLogin} from '../controllers/auth.controller.js';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/login-google', googleLogin);

export default authRouter;