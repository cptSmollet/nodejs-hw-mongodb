import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

async function initMongoConnection() {
  try {
   
    const user = process.env.MONGODB_USER;
    const pwd = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const db = process.env.MONGODB_DB;
    const DB_URL = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=mongodb`;
    
    await mongoose.connect(DB_URL);
    console.log('Database connection successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initMongoConnection };
