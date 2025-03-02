import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for a Journal Entry
export interface IJournalEntry extends Document {
  journalCode: String, // Change to ObjectId for proper referencing
  user: mongoose.Types.ObjectId;         // User ID referencing the User model
  content: string;                       // Content of the journal entry
  date: Date;                            // Date of the journal entry
  topic: string;                         // Topic associated with the journal entry
}

// Create a schema for Journal Entry
const journalEntrySchema: Schema = new Schema({
  journalCode: {
    type: String, // Change to ObjectId to reference JournalCode
    ref: 'JournalCode',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // User ID referencing User model
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Set default to current date
  },
  topic: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Export the JournalEntry model
export default mongoose.model<IJournalEntry>('JournalEntry', journalEntrySchema);
