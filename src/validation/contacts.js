import Joi from 'joi'; 

const contactsSchemaJoi = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
});

export default contactsSchemaJoi;
