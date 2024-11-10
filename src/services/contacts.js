import Contact from '../models/contact.js'; 

export const createContact = async ({ name, phoneNumber, email, isFavourite, contactType }) => {
  const newContact = new Contact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType
  });

  return await newContact.save();
};

export const updateContact = async (contactId, { name, phoneNumber, email, isFavourite, contactType }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { name, phoneNumber, email, isFavourite, contactType },
    { new: true }
  );

  if (!updatedContact) {
    throw new Error('Contact not found');
  }

  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw new Error('Contact not found');
  }

  return deletedContact; 
};
