import { Request, Response } from "express";
import Todo from "../models/todo";

export const getTodos = async (req: Request, res: Response, next: any) => {
  try {
    const { favorite, color } = req.query;

    const filter: any = {};
    if (favorite !== undefined) filter.favorite = favorite === "true";
    if (color) filter.color = color;

    const todos = await Todo.find(filter).sort({ favorite: -1, createdAt: -1 });

    res.json(todos);
  } catch (error) {
    next(error);
  }
};
export const createTodo = async (req: Request, res: Response, next: any) => {
  try {
    const { title, description, color } = req.body;
    const fav =
      typeof req.body.favorite === "boolean"
        ? req.body.favorite
        : typeof req.body.isFavorite === "boolean"
        ? req.body.isFavorite
        : false;

    const todo = await Todo.create({
      title,
      description,
      color,
      isFavorite: fav,
    });

    return res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao criar tarefa" });
  }
};

export const updateTodo = async (req: Request, res: Response, next: any) => {
  try {
    const { title, description, color } = req.body;

    
    const hasFavorite =
      typeof req.body.favorite === "boolean" ||
      typeof req.body.isFavorite === "boolean";

    const fav =
      typeof req.body.favorite === "boolean"
        ? req.body.favorite
        : req.body.isFavorite;

    const updates: any = {
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(color !== undefined ? { color } : {}),
      ...(hasFavorite ? { isFavorite: fav } : {}),
    };

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!todo) return res.status(404).json({ message: "Tarefa não encontrada" });

    return res.json(todo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao atualizar tarefa" });
  }
};

export const deleteTodo = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ error: "Tarefa não encontrada" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
