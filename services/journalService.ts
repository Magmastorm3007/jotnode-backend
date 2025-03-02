import mongoose from 'mongoose';
import JournalCode from '../models/JournalCode';
import User from '../models/User';
import Message from '../models/Message'
import JournalEntry from '../models/JournalEntry';
const TOPICS = [
  "What are you grateful for today?",
  "Describe a meaningful dream you had.",
  "Write about a book that changed your perspective.",
  "What is something you want to achieve this year?"
];

export const createJournalCode = async (userId: mongoose.Types.ObjectId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

  const journalCode = new JournalCode({
    code,
    topic,
    users: [userId],
  });

  await journalCode.save();

  await User.findByIdAndUpdate(
    userId,
    { $push: { journalCodes: journalCode._id } },
    { new: true }
  );

  return { code, topic };
};

export const joinJournalCode = async (
  userId: mongoose.Types.ObjectId,
  code: string
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const journalCode = await JournalCode.findOne({ code });
  if (!journalCode) throw new Error("Invalid journal code");

  if (journalCode.users.some(id => id.equals(userId))) {
    throw new Error("You are already in this journal");
  }

  await JournalCode.findByIdAndUpdate(
    journalCode._id,
    { $push: { users: userId } },
    { new: true }
  );

  await User.findByIdAndUpdate(
    userId,
    { $push: { journalCodes: journalCode._id } },
    { new: true }
  );

  return {
    message: "Joined journal successfully",
    topic: journalCode.topic,
  };
};

export const postMessageToRoom = async (
  userId: mongoose.Types.ObjectId,
  code: string,
  message: string
) => {
  const journalCode = await JournalCode.findOne({ code });
  if (!journalCode) throw new Error("Invalid journal code");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (!journalCode.users.some(id => id.equals(userId))) {
    throw new Error("User is not part of this journal");
  }

  const newMessage = new Message({
    journalCode: journalCode._id,
    user: userId,
    content: message
  });

  await newMessage.save();

  await JournalCode.findByIdAndUpdate(
    journalCode._id,
    { $push: { messages: newMessage._id } },
    { new: true }
  );

  return {
    message: "Message posted successfully",
    messageId: newMessage._id
  };
};

export const getRoomMessages = async (code: string, page = 1, limit = 50) => {
  // Find the journal code in the JournalCode model
  const journalCode = await JournalCode.findOne({ code });
  
  // Throw an error if the journal code is invalid
  if (!journalCode) throw new Error("Invalid journal code");

  // Find messages in the JournalEntries model based on the journal code
  const messages = await JournalEntry.find({ 
    journalCode: code // Use _id to reference the journal code
  })
  .populate('user', 'username') // Populate user details
  .sort({ createdAt: -1 }) // Sort messages by creation date in descending order
  .skip((page - 1) * limit) // Skip messages for pagination
  .limit(limit); // Limit the number of messages returned

  // Return the topic and formatted messages
  return {
    topic: journalCode.topic,
    messages: messages.map(msg => ({
      id: msg._id,
      content: msg.content,
      user: msg.user,
      date:msg.date
    })),
  };
};

export const getUserJournals = async (userId: mongoose.Types.ObjectId) => {
  const user = await User.findById(userId).populate("journalCodes");
  if (!user) throw new Error("User not found");

  return user.journalCodes.map((journal: any) => ({
    code: journal.code, 
    topic: journal.topic,
  }));
};

