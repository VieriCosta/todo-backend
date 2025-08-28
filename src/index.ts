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

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
setupSwagger(app);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  (async () => {
    await connectDB(); // se falhar, process.exit(1) em dev/prod
    if (process.env.NODE_ENV !== "production") {
      await seedTodos();
    }
    app.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`));
  })();
}

export default app;
