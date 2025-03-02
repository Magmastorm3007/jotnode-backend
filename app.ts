import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import authRoutes from "./routes/authRoutes";
import journalRoutes from "./routes/journalRoutes";
import userRoutes from "./routes/userRoutes";
import { setupSocketIO } from "./services/socketService";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = setupSocketIO(server);
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI!, {
    
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error(err));
  
app.use("/auth", authRoutes);
app.use("/journal", journalRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
