import fs from 'node:fs/promises';
import path from 'node:path';
import createHttpError from 'http-errors';
import Contact from '../models/Сontact.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export async function getAllContacts(req, res, next) {
  try {
    const {
      page = 1,
      perPage = 4,
      sortBy = 'name',
      sortOrder = 'asc',
      type,
      isFavourite,
    } = req.query;

    const { _id: userId } = req.user;

    const filter = { userId };

    if (type !== undefined) {
      filter.contactType = type;
    }
    if (isFavourite !== undefined) {
      filter.isFavourite = isFavourite === 'true';
    }

    const contacts = await Contact.find(filter)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })  
      .skip((page - 1) * perPage)  
      .limit(perPage);  

    const totalItems = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / perPage);  

    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        totalItems,
        page: Number(page),
        perPage: Number(perPage),
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    next(createHttpError(500, 'Error fetching contacts'));
  }
}

export async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const { userId } = req.user;
  try {
    const contact = await Contact.findOne({ _id: contactId, userId });  
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    next(createHttpError(500, 'Internal Server Error'));
  }
}

export async function addContact(req, res) {
  try {
    let photo = null;

    if (req.file) {
      if (process.env.ENABLE_CLOUDINARY === 'true') {
        try {
          const result = await uploadToCloudinary(req.file.path);
          await fs.unlink(req.file.path);
          photo = result.secure_url;
        } catch (error) {
          console.error('Error uploading photo to Cloudinary:', error);
          return res.status(500).json({
            status: 500,
            message: 'Error uploading photo',
          });
        }
      } else {
        await fs.rename(
          req.file.path,
          path.resolve('src', 'public/photos', req.file.filename),
        );
        photo = `http://localhost:3000/photos/${req.file.filename}`;
      }
    }

    const newContact = await Contact.create({
      ...req.body,
      userId: req.user._id,
      photo,
    });

    res.status(201).json({
      status: 201,
      message: `Successfully created a contact!`,
      data: newContact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      status: 500,
      message: 'Error creating contact',
    });
  }
}

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    let photo = null;

    if (req.file) {
      if (process.env.ENABLE_CLOUDINARY === 'true') {
        try {
          const result = await uploadToCloudinary(req.file.path);
          await fs.unlink(req.file.path);
          photo = result.secure_url;
        } catch (error) {
          console.error('Error uploading photo to Cloudinary:', error);
          return res.status(500).json({
            status: 500,
            message: 'Error uploading photo',
          });
        }
      } else {
        await fs.rename(
          req.file.path,
          path.resolve('src', 'public/photos', req.file.filename),
        );
        photo = `http://localhost:3000/photos/${req.file.filename}`;
      }
    }

    const updatedData = { ...req.body };
    if (photo) {
      updatedData.photo = photo;
    }

    const result = await Contact.findByIdAndUpdate(contactId, updatedData, { new: true });

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully patched a contact!`,
      data: result,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      status: 500,
      message: 'Error updating contact',
    });
  }
};

export async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params; 
    const { _id: userId } = req.user; 
    const result = await Contact.findOneAndDelete({ _id: contactId, userId });

    if (!result) {
      throw createHttpError(404, 'Contact not found'); 
    }
    res.status(204).json({
      status: 204,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    if (createHttpError.isHttpError(error)) {
      return next(error);
    }
    next(createHttpError(500, 'Internal Server Error'));
  }
}