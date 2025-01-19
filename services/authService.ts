import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

export const signup = async (
  username: string,
  email: string,
  password: string,
) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    return { error: "User already exists" };
  }

  const user = new User({ username, email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return { token };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { error: "Invalid credentials" };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return { error: "Invalid credentials" };
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return { token };
};
