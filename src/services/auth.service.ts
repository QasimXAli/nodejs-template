import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { AppError } from '../utils/app-error';

const SALT_ROUNDS = 10;

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export const signupService = async ({ name, email, password }: SignupInput) => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new AppError('User already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};