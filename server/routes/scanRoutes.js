import {Router} from 'express'
import {sccanRequest,getScans} from '../controllers/scanController.js'
import verifyToken from '../middlewares/TokenManage.js'

const scanRouter = Router()

scanRouter.post("/scaninitiate",verifyToken,sccanRequest)
scanRouter.get('/getscans',verifyToken,getScans)


export default scanRouter
