import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contactsRoutes.js';
import { loadEnv } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js'; 
import { errorHandler } from './middlewares/errorHandler.js';
import contactRoutes from './routes/contactRoutes';

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

  app.use('/api', contactRoutes);
  app.use((err, req, res, next) => {
    if (err) {
      res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
      });
    }
  });

  app.use('/contacts', contactsRouter);

  app.use('*', notFoundHandler);  

  app.use(errorHandler); 

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { setupServer };



