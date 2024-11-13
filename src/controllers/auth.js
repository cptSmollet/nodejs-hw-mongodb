import createHttpError from 'http-errors';
import User from '../models/user.js';

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {

    if (!name || !email || !password) {
      throw createHttpError(400, 'Missing required fields');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, 'Email in use');
    }

    const newUser = new User({
      name,
      email,
      password, 
    });

    await newUser.save();

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error); 
  }
};

export { register };
