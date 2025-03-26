import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

export let dbInstance = null;

const connectDB = async () => {
    try {
        // Check if MONGODB_URI exists
        if (!process.env.MONGODB_URI) {
            throw new Error('MongoDB URI is not provided');
        }

        // Attempt to connect to MongoDB
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: DB_NAME, // Optional: add dbName from constants.js
            }
        );

        dbInstance = connectionInstance;
        console.log(
            `\nMongoDB connected: ${connectionInstance.connection.host}\n`
        );
    } catch (error) {
        console.error('MongoDB connection error:', error.message || error);
        process.exit(1); // Exit the process in case of failure
    }
};

export default connectDB;
