import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ Erro:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Erro interno no servidor" });
};

export default errorHandler;
