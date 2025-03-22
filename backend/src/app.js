import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const httpServer = createServer(app);

// cors origin setting
app.use(
    cors({
        origin: process.env.CORS_ORIGIN, // Allow requests from your frontend
        credentials: true, // Allow cookies to be sent
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
        allowedHeaders: 'Content-Type,Authorization', // Allow these headers
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
app.use('/api/user', userRouter)





export { httpServer };
