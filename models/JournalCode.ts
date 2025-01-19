import mongoose, { Document, Schema } from "mongoose";

export interface IJournalCode extends Document {
  code: string;
  topic: string;
  users: mongoose.Types.ObjectId[];
}

const journalCodeSchema: Schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  topic: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model<IJournalCode>("JournalCode", journalCodeSchema);
