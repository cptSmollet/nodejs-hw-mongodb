import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, 
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], 
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true, 
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
