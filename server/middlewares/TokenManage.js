import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import express from 'express'
import 'dotenv/config'

const app = express()
app.use(cookieParser())
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Check both cookies and Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Token is missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        res.locals.jwtData = decoded;  // Store the decoded token in locals
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default verifyToken
