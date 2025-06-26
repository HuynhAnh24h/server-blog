import authRouter from './auth.router.js';
import { Router } from 'express';

const appRouter = Router();

appRouter.use("/api/auth", authRouter);

export default appRouter;