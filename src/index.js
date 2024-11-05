import { initMongoConnection } from './db/initMongoConnection.js';
import setupServer from './server.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Failed to bootstrap the application:', error);
  }
};

bootstrap();