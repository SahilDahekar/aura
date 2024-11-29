import { Router } from 'express';
import authRouter from './authroutes.js';

const appRouter = Router();

appRouter.use("/user",authRouter)



export default appRouter;