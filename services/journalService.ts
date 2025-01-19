import mongoose from 'mongoose';
import JournalCode, { IJournalCode } from "../models/JournalCode";
import User, { IUser } from "../models/User";

const topics = [
  "What are you grateful for today?",
  "Describe a meaningful dream you had.",
  "Write about a book that changed your perspective.",
  "What is something you want to achieve this year?",
];

export const createJournalCode = async (userId: string) => {
  // Ensure valid mongoose ObjectId
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const user = await User.findById(userObjectId);
  if (!user) throw new Error("User not found");

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const journalCode = new JournalCode({
    code,
    topic,
    users: [userObjectId],
  });

  await journalCode.save();

  // Type-safe update with $push
  await User.findByIdAndUpdate(
    userObjectId, 
    { $push: { journalCodes: journalCode._id } },
    { new: true }
  );

  return { code, topic };
};

export const joinJournalCode = async (userId: string, code: string) => {
  // Ensure valid mongoose ObjectId
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const user = await User.findById(userObjectId);
  if (!user) throw new Error("User not found");

  const journalCode = await JournalCode.findOne({ code });
  if (!journalCode) throw new Error("Invalid journal code");

  // Use ObjectId comparison
  if (journalCode.users.some(id => id.equals(userObjectId))) {
    throw new Error("You are already in this journal");
  }

  // Update JournalCode with new user
  await JournalCode.findByIdAndUpdate(
    journalCode._id,
    { $push: { users: userObjectId } },
    { new: true }
  );

  // Update User with new journal code
  await User.findByIdAndUpdate(
    userObjectId,
    { $push: { journalCodes: journalCode._id } },
    { new: true }
  );

  return { 
    message: "Joined journal successfully", 
    topic: journalCode.topic 
  };
};
