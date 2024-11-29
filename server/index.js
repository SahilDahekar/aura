import app from './app.js';
import mongoose from 'mongoose';
import 'dotenv/config'

const port = 8000;

mongoose
    .connect(process.env.MONGO, { useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((err) => console.log(err));//