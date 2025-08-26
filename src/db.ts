import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/todoapp";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("📦 MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB", error);
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  }
};

export default connectDB;