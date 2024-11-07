import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();  

async function initMongoConnection() {
  try {
    const user = process.env.MONGODB_USER;
    const pwd = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const db = process.env.MONGODB_DB;

    if (!user || !pwd || !url || !db) {
      throw new Error('One or more MongoDB environment variables are missing.');
    }

    const DB_URL = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

    
    await mongoose.connect(DB_URL);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);  
  }
}

export { initMongoConnection };



