import express from 'express';
import contactsRoutes from './contactsRoutes.js';
import authRoutes from './auth.js'; 

const router = express.Router();

router.use('/contacts', contactsRoutes);
router.use('/auth', authRoutes); 

export default router;
