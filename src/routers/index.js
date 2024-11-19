import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import contactsRoutes from './contactsRoutes.js';
import authRoutes from './auth.js'; 

const router = express.Router();

router.use('/contacts', authenticate, contactsRoutes);
router.use('/auth', authRoutes); 

export default router;
