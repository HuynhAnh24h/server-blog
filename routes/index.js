import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import { Router } from 'express';

const appRouter = Router();

appRouter.use("/api/auth", authRouter);
appRouter.use("/api/user",userRouter)

export default appRouter;