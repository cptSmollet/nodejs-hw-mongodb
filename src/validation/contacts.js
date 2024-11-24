import Joi from 'joi';

export const contactsSchemaJoi = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 50 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required().messages({
    'string.pattern.base': 'Phone number must be in a valid format.',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Invalid email format',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'IsFavourite must be a boolean value.',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').optional().messages({
    'any.only': 'Contact type must be one of "work", "home", or "personal".',
  }),
  photo: Joi.string().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  photo: Joi.string(),
});
