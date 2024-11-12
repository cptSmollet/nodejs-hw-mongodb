import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import Contact from '../models/contact.js';

export async function getAllContacts(req, res, next) {
  try {
    const { page = 1, perPage = 4 } = req.query; 
    const skip = (page - 1) * perPage; 
  
    const contacts = await Contact.find()
      .skip(skip)
      .limit(Number(perPage));

    const totalItems = await Contact.countDocuments(); 

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        contacts,
        totalItems,
        page: Number(page),
        perPage: Number(perPage),
        totalPages: Math.ceil(totalItems / perPage), 
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
}


export async function getContactById(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (error) {
    next(createHttpError(500, 'Internal Server Error'));
  }
}

export async function addContact(req, res, next) {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber || !email) {
      return next(createHttpError(400, 'Missing required fields'));
    }

    const newContact = new Contact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    await newContact.save();
    res.status(201).json({
      status: 'success',
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(createHttpError(500, 'Internal Server Error'));
  }
}

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, phoneNumber, email, isFavourite, contactType },
      { new: true }
    );

    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(createHttpError(500, 'Internal Server Error'));
  }
};

export async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(204).send(); 
  } catch (error) {
    next(createHttpError(500, 'Internal Server Error'));
  }
}
