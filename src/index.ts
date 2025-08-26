import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todoRoutes from "./routes/todoRoutes";
import connectDB from "./db";
import errorHandler from "./middleware/errorHandler";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
setupSwagger(app);
app.use(errorHandler);

// Só conecta e sobe o servidor se não for teste
if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`));
  });
}

export default app;
