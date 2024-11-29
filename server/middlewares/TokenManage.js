import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import express from 'express'
import 'dotenv/config'
import { decode } from 'punycode'

const app = express()
app.use(cookieParser())
const verifyToken = (req, res, next) => {
  try {
    
    const token =
      req.cookies.token ||
      req.headers.authorization?.replace('Bearer ', '') ||
      req.headers.cookie
        ?.split(';')
        .find(c => c.trim().startsWith('token='))
        ?.split('=')[1]

    if (!token) {
      console.log('No token found')
      return res.status(401).json({ error: 'Authentication required' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log('Decoded token:', decoded)
      res.locals.jwtData = decoded
      //console.log(decoded)
      next()
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError)
      return res.status(401).json({ error: 'Invalid token' })
    }
  } catch (err) {
    console.error('Auth middleware error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default verifyToken