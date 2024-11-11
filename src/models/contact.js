import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
    },
    email: {
      type: String,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
      lowercase: true, 
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: [true, 'Contact type is required'],
      default: 'personal',
    },
  },
  { timestamps: true }
);

contactSchema.index({ phoneNumber: 1 }, { unique: true });
contactSchema.index({ email: 1 }, { unique: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
