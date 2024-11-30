import { Router } from "express";
import { uploadFile,getfiles } from "../controllers/resultControllers.js";
import upload from "../middlewares/multer.js";

const resultRouter = Router()

resultRouter.post("/upload",upload.single('file'),uploadFile)   
resultRouter.get("/getfile",getfiles)


export default resultRouter