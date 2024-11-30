import { Router } from 'express';
import authRouter from './authroutes.js';
import scanRouter from './scanRoutes.js';

const appRouter = Router();

appRouter.use("/user",authRouter)
appRouter.use('/scan',scanRouter)


export default appRouter;