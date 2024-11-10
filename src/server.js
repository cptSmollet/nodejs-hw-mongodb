import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contactsRoutes.js';
import { loadEnv } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js'; 
import { errorHandler } from './middlewares/errorHandler.js';

loadEnv(); 

const PORT = process.env.PORT || 3000; 

function setupServer() {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true, 
        },
      },
    }),
  );

  app.use(express.json());
  app.use(cors());

  app.use('/contacts', contactsRouter);

  app.use('*', notFoundHandler);  

  app.use(errorHandler); 

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { setupServer };



