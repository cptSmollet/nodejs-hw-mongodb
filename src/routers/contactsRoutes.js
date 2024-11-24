import express from 'express';
import { 
  getAllContacts, 
  getContactById, 
  addContact, 
  patchContactController, 
  deleteContact 
} from '../controllers/contactsController.js'; 
import isValidId from '../middlewares/isValidId.js'; 
import validateBody from '../middlewares/validateBody.js'; 
import {contactsSchemaJoi, updateContactSchema } from '../validation/contacts.js'; 
import { ctrlWrapper } from '../utils/ctrlWrapper.js'; 
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContacts));

router.get('/:contactId', isValidId, ctrlWrapper(getContactById));

router.post('/', upload.single('photo'), validateBody(contactsSchemaJoi), ctrlWrapper(addContact));

router.patch('/:contactId', upload.single('photo'), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
