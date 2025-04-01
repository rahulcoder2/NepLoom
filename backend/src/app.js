import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import requestIp from 'request-ip';

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

// requestIp middleware setting
app.use(requestIp.mw());

// rate limit setting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5000,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.clientIp;
    },
    handler: (_, res, __, options) => {
        return res.status(429).json({
            message: `There are too many requests. You are only allowed ${
                options.max
            } requests every ${options.windowMs / 1000} seconds.`,
        });
    },
});

app.use(limiter);

// express middleware setting for request body size limit.
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.static('public'));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('hello world');
});

// Import routes

import userRouter from './routes/user.routes.js';
import categoryRouter from './routes/category.routes.js';
import productRouter from './routes/product.routes.js';

// routes declaration
app.use('/api/user', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

export { httpServer };
