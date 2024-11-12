import Contact from '../models/contact.js';

export const getContacts = async ({ page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', filter = {} }) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  // Фильтрация по типу контакта
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  // Фильтрация по статусу избранного
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  // Пагинация и сортировка
  const [total, contacts] = await Promise.all([
    Contact.countDocuments(), // Количество всех документов
    contactsQuery
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 }) // Сортировка
      .skip(skip) // Пагинация
      .limit(perPage) // Ограничение на количество
      .exec(),
  ]);

  const totalPages = Math.ceil(total / perPage); // Вычисление общего количества страниц

  return {
    data: contacts,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

export const createContact = async ({ name, phoneNumber, email, isFavourite = false, contactType = 'personal' }) => {
  const newContact = new Contact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
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
