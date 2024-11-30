import { Router } from 'express';
import authRouter from './authroutes.js';
import scanRouter from './scanRoutes.js';
import resultRouter from './resultRotes.js';

const appRouter = Router();

appRouter.use("/user",authRouter)
appRouter.use('/scan',scanRouter)
appRouter.use("/result",resultRouter)


export default appRouter;