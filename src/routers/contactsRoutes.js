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
import contactsSchemaJoi from '../validation/contacts.js'; 
import { ctrlWrapper } from '../utils/ctrlWrapper.js'; 
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

const jsonParser = express.json({
  type: 'application/json',
});

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContacts));

router.get('/:contactId', isValidId, ctrlWrapper(getContactById));

router.post('/', validateBody(contactsSchemaJoi), ctrlWrapper(addContact));

router.patch('/:contactId', isValidId, validateBody(contactsSchemaJoi), ctrlWrapper(patchContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;

