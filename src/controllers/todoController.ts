import { Request, Response } from "express";
import Todo from "../models/todo";
import { todoSchema } from "../validators/todoValidator";

// Listar todos (com filtros opcionais)
export const getTodos = async (req: Request, res: Response, next: any) => {
  try {
    const { favorite, color } = req.query;

    // Construir filtro dinâmico
    const filter: any = {};
    if (favorite !== undefined) filter.favorite = favorite === "true";
    if (color) filter.color = color;

    // Buscar no Mongo com filtros + ordenar favoritos no topo
    const todos = await Todo.find(filter).sort({ favorite: -1, createdAt: -1 });

    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// Criar uma nova tarefa
export const createTodo = async (req: Request, res: Response, next: any) => {
  try {
    const data = todoSchema.parse(req.body);
    const newTodo = new Todo(data);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// Atualizar uma tarefa
export const updateTodo = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    const data = todoSchema.partial().parse(req.body); // valida apenas os campos enviados
    const todo = await Todo.findByIdAndUpdate(id, data, { new: true });
    if (!todo) return res.status(404).json({ error: "Tarefa não encontrada" });
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Deletar uma tarefa
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
