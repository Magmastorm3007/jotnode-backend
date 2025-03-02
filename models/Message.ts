import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  journalCode: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  journalCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JournalCode',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  }
}, { timestamps: true });

MessageSchema.index({ journalCode: 1, createdAt: -1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
