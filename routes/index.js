import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import categoryRoute from './category.route.js';
import blogRouter from './blog.router.js';
import { Router } from 'express';

const appRouter = Router();

appRouter.use("/api/auth", authRouter);
appRouter.use("/api/user",userRouter);
appRouter.use("/api/category",categoryRoute)
appRouter.use("/api/blog",blogRouter)

export default appRouter;