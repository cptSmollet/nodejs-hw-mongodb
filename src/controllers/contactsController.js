import Contact from '../models/contact.js';
import mongoose from 'mongoose';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    console.error(error);  
    res.status(500).json({
      status: 500,
      message: "Failed to fetch contacts.",
    });
  }
};


export const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid contact ID format",
      });
    }

    const contact = await Contact.findById(contactId);

    
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error(error);  
    res.status(500).json({
      status: 500,
      message: "Failed to fetch contact.",
    });
  }
};

