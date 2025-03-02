import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import mongoose from "mongoose";
import JournalEntry from "../models/JournalEntry";
import JournalCode from "../models/JournalCode";

export function setupSocketIO(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New socket connection:", socket.id);

    socket.on("joinJournalRoom", async (journalCodeStr: string) => {
      if (!journalCodeStr) {
        socket.emit("error", { message: "Invalid journal code" });
        return;
      }
      const journalDoc = await JournalCode.findOne({ code: journalCodeStr });
      if (!journalDoc) {
        socket.emit("error", { message: "Journal code not found" });
        return;
      }
      socket.join(journalCodeStr);
      console.log(`User joined journal room: ${journalCodeStr}`);
    });

    socket.on("createJournalEntry", async (data, callback) => {
      try {
        const { journalCodeId, content, userId } = data;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
          if (callback) callback({ error: "Invalid user ID" });
          return;
        }

        const journalDoc = await JournalCode.findOne({ code: journalCodeId });
        if (!journalDoc) {
          if (callback) callback({ error: "Journal code not found" });
          return;
        }

        const newEntry = new JournalEntry({
          journalCode: journalCodeId,
          user: new mongoose.Types.ObjectId(userId),
          content,
          topic: journalDoc.topic,
        });

        await newEntry.save();

        // Populate the user field to get username details
        await newEntry.populate("user", "username");
        const populatedEntry = newEntry;

        const responseMessage = {
          id: populatedEntry._id,
          user: populatedEntry.user, // populated user details
          content: populatedEntry.content,
          createdAt: populatedEntry.date, // use "date" field as creation time
        };

        io.to(journalCodeId).emit("newJournalEntry", responseMessage);

        if (callback) callback({ success: true, message: responseMessage });
        console.log("Journal entry saved and broadcasted:", responseMessage);
      } catch (error) {
        console.error("Socket journal entry error", error);
        if (callback) callback({ error: "Error creating journal entry" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}
