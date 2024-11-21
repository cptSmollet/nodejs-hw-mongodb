import { initMongoConnection } from './db/initMongoConnection.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { setupServer } from './server.js';  

const bootstrap = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
  } catch (error) {
    console.error('Failed to bootstrap the application:', error);
  }
};

bootstrap();
