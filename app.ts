import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from 'morgan'
import dotenv from 'dotenv'
import { errorsHandler } from './helpers/errorsHandler';

import { todoRouter } from './routes/todo.route';

dotenv.config()

const app: Application = express();

const typeLogger = app.get('env') === 'development' ? 'dev' : 'short';
const PORT = process.env.PORT || 5005;
const MONGO_URL: string = process.env.MONGO_URL || '';

app.use(logger(typeLogger));
app.use(cors());

app.use(express.json());

app.use('/api/todo', todoRouter)


app.use((_, res: Response) => {
    res.status(404).json({ message: 'Sorry, but this resource not found' });
});

app.use(errorsHandler);

const start = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL);

        console.log('Database connection successful');

        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    } catch (error) {
        console.log('\x1B[31mDatabase connection failed');
        process.exit(1);
    }
};

start();