import express from 'express';
import { getContacts, getContactById, addContact, patchContactController, deleteContact } from '../controllers/contactsController.js';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validateBody.js';
import contactsSchemaJoi from '../validation/contacts.js'; 

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', isValidId, getContactById);

router.post('/', validateBody(contactsSchemaJoi), addContact); 

router.patch('/:contactId', isValidId, validateBody(contactsSchemaJoi), patchContactController); 

router.delete('/:contactId', isValidId, deleteContact);

export default router;
