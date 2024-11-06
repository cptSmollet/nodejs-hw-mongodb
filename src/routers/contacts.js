import { Router } from 'express';
import { getAllContacts, getContactById } from '../services/contacts.js';
import Contact from '../models/contact.js'; 

const router = Router();

router.get('/', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts',
      data: contacts,
    });
  } catch (error) {
    console.error('Error retrieving contacts:', error);  
    res.status(500).json({
      status: 'error',
      message: 'Server error: Unable to retrieve contacts',
      error: error.message,
    });
  }
});

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        status: 'fail',
        message: `Contact with id ${contactId} not found`,
      });
    }
    res.status(200).json({
      status: 'success',
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  } catch (error) {
    console.error('Error retrieving contact:', error);  
    res.status(500).json({
      status: 'error',
      message: 'Server error: Unable to retrieve contact',
      error: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    if (!name || !email || !phone) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing required fields: name, email, and phone are required.',
      });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
    });

    await newContact.save();

    res.status(201).json({
      status: 'success',
      message: 'Successfully created contact',
      data: newContact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);  
    res.status(500).json({
      status: 'error',
      message: 'Server error: Unable to create contact',
      error: error.message,
    });
  }
});

export default router;




