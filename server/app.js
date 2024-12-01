import express from 'express';
import appRouter from './routes/index.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config'

const app = express();

app.use(express.json());
app.use(cookieParser('secret'))
const corsOptions = {
    origin: 'https://aura.parthbhattad.in',
    credentials: true, // This allows cookies to be sent/received
    optionsSuccessStatus: 200
  }


app.use(cors(corsOptions))  
  

app.use('/api', appRouter);

app.get('/', (req, res) => {
    res.send('Server is live...');
});

export default app;