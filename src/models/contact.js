import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [false, 'Email is required'], 
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], 
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true, 
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

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
