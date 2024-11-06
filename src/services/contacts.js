import Contact from '../models/contact.js';  

const getAllContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export { getAllContacts, getContactById };
