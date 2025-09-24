import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI ? process.env.DB_URI : `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_NAME}?authSource=admin`;

export function connectToDatabase() {
    try {
        return mongoose.connect(uri);
    } catch (error) {
        console.log(error.message)
    }
}