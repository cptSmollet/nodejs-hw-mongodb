import express from 'express';
import { getContacts, getContactById, addContact, patchContactController, deleteContact } from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', getContacts); 
router.get('/:contactId', getContactById); 
router.post('/', addContact); 
router.patch('/:contactId', patchContactController);
router.delete('/:contactId', deleteContact); 

export default router;
