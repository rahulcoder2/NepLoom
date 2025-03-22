import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const httpServer = createServer(app);

// cors origin setting
app.get(
    cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN,
    })
);

// express middleware setting for request rate limit.
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('hello world');
});

// Import routes

import userRouter from './routes/user.routes.js'


// routes declaration 
app.use('/api/v1/user', userRouter)





export { httpServer };
