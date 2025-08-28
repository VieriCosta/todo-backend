import { Request, Response, NextFunction } from "express";
import Todo, { ITodo } from "../models/todo";

/** GET /todos (com filtros opcionais) */
export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { favorite, color } = req.query;

    const filter: Record<string, any> = {};
    if (favorite !== undefined) {
      // aceita "true"/"false" como string
      filter.isFavorite = String(favorite).toLowerCase() === "true";
    }
    if (color) filter.color = color;

    const list = await Todo.find(filter).lean({ virtuals: true });
    return res.json(list);
  } catch (err) {
    return next(err);
  }
};

/** POST /todos */
export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: Partial<ITodo> & Record<string, any> = { ...req.body };

    // converte favorite -> isFavorite (create aceita alias, mas deixamos explícito)
    if (typeof payload.favorite === "boolean" && payload.isFavorite === undefined) {
      payload.isFavorite = payload.favorite;
      delete payload.favorite;
    }

    const created = await Todo.create(payload);
    return res.status(201).json(created.toJSON()); // garante favorite no retorno
  } catch (err) {
    return next(err);
  }
};

/** PUT /todos/:id */
export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates: Partial<ITodo> & Record<string, any> = { ...req.body };

    // IMPORTANTE: update não entende alias; mapeamos manualmente
    if (typeof updates.favorite === "boolean" && updates.isFavorite === undefined) {
      updates.isFavorite = updates.favorite;
      delete updates.favorite;
    }

    const updated = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Todo not found" });

    return res.json(updated.toJSON()); // inclui virtual favorite
  } catch (err) {
    return next(err);
  }
};

/** DELETE /todos/:id */
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const removed = await Todo.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Todo not found" });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
