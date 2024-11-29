import express from 'express';
import appRouter from './routes/index.js';

const app = express();

app.use(express.json());

app.use('/api', appRouter);

app.get('/', (req, res) => {
    res.send('Server is live...');
});

export default app;