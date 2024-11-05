import { Contact } from '../models/contact.js';

export const getContacts = async ({ 
  page, 
  perPage, 
  sortBy, 
  sortOrder,
  filter,
  userId,
 }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = Contact.find();


  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  };

  contactsQuery.where('userId').equals(userId);

  const [total, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage)
      .exec(),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
};
export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactOne, payload, options = {}) => {


  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactOne._id,
      userId:contactOne.userId
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async ({contactId, userId}) => {
  const contact = await Contact.findOneAndDelete({
    contactId,
    userId
  });

  return contact;
};