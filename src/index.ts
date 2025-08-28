import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todoRoutes from "./routes/todoRoutes";
import connectDB from "./db";
import errorHandler from "./middleware/errorHandler";
import { setupSwagger } from "./swagger";
import { seedTodos } from "./seed";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/todos", todoRoutes);

// Swagger docs
setupSwagger(app);

// Middleware global de erros
app.use(errorHandler);

// Inicialização
if (process.env.NODE_ENV !== "test") {
  connectDB().then(async () => {
    if (process.env.NODE_ENV !== "production") {
      try {
        await seedTodos();
        console.log("✅ Seed executada com sucesso.");
      } catch (err) {
        console.error("❌ Erro ao rodar seed:", err);
      }
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server rodando na porta ${PORT}`);
    });
  });
}

export default app;
