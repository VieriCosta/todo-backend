// src/db.ts
import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/todo";
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("📦 MongoDB conectado:", uri);
  } catch (err: any) {
    console.error("❌ Erro ao conectar no MongoDB:", err?.message || err);
    console.error("URI usado:", uri);
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
    throw err;
  }
}

mongoose.connection.on("error", (e) => {
  console.error("Mongo connection error:", e);
});
