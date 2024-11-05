import mongoose from 'mongoose';
import { env } from '../utils/env.js';

async function initMongoConnection() {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    const DB_URL = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=mongodb`;
    await mongoose.connect(DB_URL);
    console.log('Database connection successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { initMongoConnection };
