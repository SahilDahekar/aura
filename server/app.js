import express from 'express';
import appRouter from './routes/index.js';
import cors from 'cors'

const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // This allows cookies to be sent/received
    optionsSuccessStatus: 200
  }


app.use(cors(corsOptions))  
  

app.use('/api', appRouter);

app.get('/', (req, res) => {
    res.send('Server is live...');
});

export default app;