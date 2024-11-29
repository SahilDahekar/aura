import { Router } from 'express';
import authRouter from './authRoutes.js';

const appRouter = Router();

appRouter.use("/user",authRouter)



export default appRouter;