import createHttpError from 'http-errors';
import Contact from '../models/contact.js';

export async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(createHttpError(500, 'Internal Server Error'));  
  }
}

export async function getContactById(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));  
    }
    res.json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (error) {
    next(createHttpError(500, 'Internal Server Error'));  
  }
}

export async function addContact(req, res, next) {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({
      status: 201,
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

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (err) {
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
