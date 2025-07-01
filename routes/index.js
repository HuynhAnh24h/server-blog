import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import categoryRoute from './category.route.js';
import { Router } from 'express';

const appRouter = Router();

appRouter.use("/api/auth", authRouter);
appRouter.use("/api/user",userRouter);
appRouter.use("/api/category",categoryRoute)

export default appRouter;