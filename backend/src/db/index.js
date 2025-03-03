import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

export let dbInstance = undefined;
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        dbInstance = connectionInstance;
        console.log(`\n MongoDB connected !! ${connectionInstance.connection.host} \n`)
    } catch (error) {
        console.log('MongoDB connection error: ', error);
        console.log(process.exit(1))
    }
};

export default connectDB
