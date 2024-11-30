import {Router} from 'express'
import {scanRequest,getScans} from '../controllers/scanController.js'
import verifyToken from '../middlewares/TokenManage.js'

const scanRouter = Router()

scanRouter.post("/scaninitiate",scanRequest)
scanRouter.get('/getscans',verifyToken,getScans)


export default scanRouter
