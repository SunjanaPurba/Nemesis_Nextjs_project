import mongoose from "mongoose";
import dns from "dns";

const MONGODB_URI = process.env.MONGODB_URI;

dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);


export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables. Add it to .env.local");
  }
  await mongoose.connect(MONGODB_URI);
}