import {Router} from 'express'
import {scanRequest,getScans,execKestraFlow} from '../controllers/scanController.js'
import verifyToken from '../middlewares/TokenManage.js'

const scanRouter = Router()

scanRouter.post("/scaninitiate",scanRequest)
scanRouter.get('/getscans',verifyToken,getScans)
scanRouter.post('/exec',execKestraFlow)


export default scanRouter
